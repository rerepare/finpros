<?php

namespace App\Http\Controllers;

//Illuminate
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
Use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Account;

Use Auth;
Use Validator;

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
            return view('Transaction.transaction', compact('year', 'student', 'user'));
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

        DB::insert('insert into transaction (id, student_id, user_id, amount, payMethod, actor, transType, description) values (?,?,?,?,?,?,?,?)', [$id, $student_id, $user_id, $amount, $payMethod, $actor, $transType, $description]);

        DB::table('active_student')->where('student_id', $student_id)->update(['balance' => $newBalance]);
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