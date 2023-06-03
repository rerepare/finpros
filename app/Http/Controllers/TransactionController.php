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
        $year = Date('Y');
        $student = DB::table('active_student')->get();
        $transaction = DB::table(('transaction'))->get();
        return view('Transaction.transaction', compact('year', 'student'));
    }

    public function history(){
        $year = Date('Y');
        return view('Transaction.history', compact('year'));
    }

    public function payment_h(){
        $year = Date('Y');
        return view('Transaction.history', compact('year'));
    }

    public function saving_h(){
        $year = Date('Y');
        return view('Transaction.history', compact('year'));
    }

    public function dataSavings(){
        $year = Date('Y');
        return view('Transaction.dataSavings', compact('year'));
    }

    public function addTransaction(Request $request)
    {

        $amount = $request -> amount;
        $transactionType = $request -> transactionType;
        $payer = $request -> payer;
        $method = $request -> method;

        DB::insert('insert into transaction (id, student_id, image, fullName, gender, classType, schoolPlacement, parentName, contact, balance) values (?,?,?,?)', [$amount, $transactionType, $payer, $method]);
    }
}