<?php

namespace App\Http\Controllers;

//Illuminate
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
Use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Account;
Use Auth;
Use Validator;
use App\Mail\TransactionNotification;
use Dompdf\Dompdf;
use Dompdf\Options;

class TransactionController extends Controller{
    // public function auth(){
    //     if(!Session::get('login')){
    //         return redirect('/oneprodeco');          
    //     }else{
    //         $kpk = Session::get('kpk');
    //         $cekUser = Account::where('us_KPK' , $kpk)->first();
    //         $userStatus = DB::table('proddev.pd_grup')->where('grp_ID',$cekUser->grp_ID)->first();
    //         return view('CDI.CDI',  compact('cekUser','userStatus') );
    //     }
    // }
        
    public function transaction(){
        if (!Session::get('login')) {
            return redirect('/login')->with('alert', 'You must login first');
        } else {
            $id = Session::get('id');
            $user = DB::table('user')->where('id', $id)->first();
            $year = Date('Y');
            $student = DB::table('active_student')->orderBy('created_at', 'desc')->get();
            $allHistory = DB::table('transaction')->orderBy('created_at', 'desc')->get();
            return view('Transaction.transaction', compact('year', 'student', 'user', 'allHistory'));
        }
    }

    public function addTransaction(Request $request)
    {
        // $untuk_laravel = $lemparan_dari_front-end -> nama_variable_dari_front-end
        $id = $request -> id;
        $student_id = $request -> student_id;
        $studentName = $request -> studentName;
        $user_id = $request -> user_id;
        $amount = $request -> amount;
        $payMethod = $request -> payMethod;
        $actor = $request -> actor;
        $transType = $request -> transType;
        $description = $request -> description;
        $newBalance = $request -> newBalance;
        $images = $request -> image;

        DB::insert('insert into transaction (id, student_id, user_id, amount, payMethod, actor, transType, description, newBalance) values (?,?,?,?,?,?,?,?,?)', [$id, $student_id, $user_id, $amount, $payMethod, $actor, $transType, $description, $newBalance]);

        DB::table('active_student')->where('student_id', $student_id)->update(['balance' => $newBalance]);

        // Retrieve recipient's email from the active_student table
        $student = DB::table('active_student')->where('student_id', $student_id)->first();
        $recipientEmail = $student->email;

        // Retrieve the specific month from the request (e.g., '2023-06' for July 2023)
        // $specificMonth = '2023-06'; // Replace this with the specific month you want to retrieve

        $specificMonth = $request->input('specific_month');

        $transactionHistory = DB::table('transaction')->where('student_id', $student_id)->orderBy('created_at', 'desc')->get();

        // Filter transaction history based on the specific month
        $filteredHistory = $transactionHistory->filter(function ($transaction) use ($specificMonth) {
            if ($specificMonth) {
                $transactionMonth = date('Y-m', strtotime($transaction->created_at));
                return $transactionMonth === $specificMonth;
            }
            return true;
        });

        // Filter transaction history if the specific month already specified above
        // $filteredHistory = $transactionHistory->filter(function ($transaction) use ($specificMonth) {
        //     $transactionMonth = date('Y-m', strtotime($transaction->created_at));
        //     return $transactionMonth === $specificMonth;
        // });

        // Send email notification
        $transactionData = [
            'id' => $id,
            'student_id' => $student_id,
            'amount' => $amount,
            'studentName' => $studentName,
            'description' => $description,
            'payMethod' => $payMethod,
            'newBalance' => $newBalance,
            'transactionHistory' => $filteredHistory,
            // Add other transaction data as needed
        ];

        // Generate the PDF with filtered transaction history for the specific month
        $pdfData = $this->generatePDF($transactionData, $specificMonth);

        // Send email notification with PDF attachment
        $this->sendEmailWithPDF($recipientEmail, $transactionData);
    }

    public function generatePDF($transactionData, $specificMonth = null)
    {
        //if specificMont is already filtered it in the addTransaction function, don't need to filter the transaction history again
        if ($specificMonth !== null) {
            // Filter transaction history based on the specific month
            $filteredHistory = $transactionData['transactionHistory']->filter(function ($transaction) use ($specificMonth) {
                $transactionMonth = date('Y-m', strtotime($transaction->created_at));
                return $transactionMonth === $specificMonth;
            });
    
            $transactionData['transactionHistory'] = $filteredHistory;
        }

        $dompdf = new Dompdf();
        $html = view('emails.transaction_pdf', compact('transactionData'))->render();
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();

        // Save the PDF to a temporary location or send it directly to the email
        $pdfContent = $dompdf->output();
        // You can save the PDF to a temporary location if needed
        // file_put_contents('path_to_save_temporary_pdf.pdf', $pdfContent);

        return $pdfContent;
    }


    public function sendEmailWithPDF($recipientEmail, $transactionData)
    {
        // Generate the PDF using the 'generatePDF' method from Step 1
        $pdfContent = $this->generatePDF($transactionData);

        // Send the email with the PDF attachment
        Mail::to($recipientEmail)->send(new TransactionNotification($transactionData, $pdfContent));

        return "Email sent with PDF attachment!";
    }

    public function history(){
        if (!Session::get('login')) {
            return redirect('/login')->with('alert', 'You must login first');
        } else {
            $id = Session::get('id');
            $user = DB::table('user')->where('id', $id)->first();
            $allHistory = DB::table('transaction')->orderBy('created_at', 'desc')->get();
            $historyPayment = DB::table('transaction')->where('transType', "Payment")->orderBy('created_at', 'desc')->get();
            $historySaving = DB::table('transaction')->where('transType', "Saving")->orderBy('created_at', 'desc')->get();
            return view('Transaction.history', compact('user', 'allHistory' ,'historyPayment', 'historySaving'));
        }
    }

    public function deleteHistory(Request $request)
    {
        $id = $request->id;

        DB::table('transaction')->where('id', $id)->delete();
    }

    // public function generateTransactionHistoryPDF($student_id)
    // {
    //     // Get the transaction history data for the specific student
    //     $transactionHistory = // Retrieve the transaction history data, e.g., from a database query

    //     // Convert the transaction history data to an HTML table
    //     $table = '<table>';
    //     foreach ($transactionHistory as $transaction) {
    //         $table .= '<tr>';
    //         $table .= '<td>' . $transaction->id . '</td>';
    //         $table .= '<td>' . $transaction->amount . '</td>';
    //         // Add other transaction data as needed
    //         $table .= '</tr>';
    //     }
    //     $table .= '</table>';

    //     // Use dompdf to generate the PDF
    //     $options = new Options();
    //     $options->set('isRemoteEnabled', true);
    //     $dompdf = new Dompdf($options);
    //     $dompdf->loadHtml($table);
    //     $dompdf->render();

    //     // Save the PDF on the server or return it as a response
    //     $pdfContent = $dompdf->output();
    //     // You can save $pdfContent to a file if you want to keep a copy on the server

    //     return $pdfContent;
    // }
}