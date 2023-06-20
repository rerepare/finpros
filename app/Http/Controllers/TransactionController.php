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

        $id = $request -> id;
        $student_id = $request -> student_id;
        $user_id = $request -> user_id;
        $amount = $request -> amount;
        $payMethod = $request -> payMethod;
        $actor = $request -> actor;
        $transType = $request -> transType;
        $description = $request -> description;
        $balance = $request -> balance;
        $newBalance = $request -> newBalance;
        $email = $request -> email;

        DB::insert('insert into transaction (id, student_id, user_id, amount, payMethod, actor, transType, description, newBalance) values (?,?,?,?,?,?,?,?,?)', [$id, $student_id, $user_id, $amount, $payMethod, $actor, $transType, $description, $newBalance]);

        DB::table('active_student')->where('student_id', $student_id)->update(['balance' => $newBalance]);

        // Retrieve recipient's email from the active_student table
        $student = DB::table('active_student')->where('student_id', $student_id)->first();
        $recipientEmail = $student->email;

        // Send email notification
        $transactionData = [
            'id' => $id,
            'student_id' => $student_id,
            // Add other transaction data as needed
        ];
        Mail::to($recipientEmail)->send(new TransactionNotification($transactionData));
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
}