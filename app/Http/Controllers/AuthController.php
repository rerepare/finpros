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

class AuthController extends Controller{
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

    public function login(){
        if(!Session::get('login')){
            $year = Date('Y');
            $user = DB::table('user')->get();
            return view('User.login',  compact('year', 'user'));            
        }else{
            return redirect('/dashboard');
        }     
    }

    public function login_check(Request $request){       
        $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);
        
        $username = $request -> username;
        $password = md5($request -> password);

        $cekUser = DB::table('user')->where('userName' , $username)->where('password' , $password)->first();

        if($cekUser){
            Session::flush();
            Session::put('username' , $cekUser->userName);
            Session::put('name' , $cekUser->name);            
            Session::put('login' , TRUE);
          }       
    }
    public function editUser(Request $request){       
        $id = $request -> id;
        $name = $request -> name;
        $userName = $request -> userName;
        $password = md5($request -> password);

        DB::table('user')->where('id', $id)->update(['name' => $name, 'userName' => $userName, 'password' => $password]);
    }

    public function deleteUser(Request $request){       
        $id = $request -> id;        

        DB::table('user')->where('id', $id)->delete();
    }

    public function logout(){
        Session::flush();
    }

    public function dashboard(){
       
        if(!Session::get('login')){
            return redirect('/login')->with('alert', 'You must login first');
        }else{
            $year = Date('Y');
            return view('User.dashboard',  compact('year') );
        }
        }
        
    

    public function register(){
        if(!Session::get('login')){
            return redirect('/login')->with('alert', 'You must login first');
        }else{
            $year = Date('Y');
        return view('User.register',  compact('year') );
        }
    }

    public function registration(Request $request){
       
        $fullName = $request -> fullName;
        $userName = $request -> userName;
        $password = md5($request -> password);

        DB::insert('insert into user (name, userName, password, isSuperAdmin) values (?,?,?,?)', [$fullName, $userName, $password, true]);
        
    }

    public function userPage(){
        if(!Session::get('login')){
            return redirect('/login')->with('alert', 'You must login first');
        }else{
            $year = Date('Y');
            $user = DB::table('user')->get();
        return view('User.user',  compact('year','user') );
        }
    }
}

