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

class SchoolsController extends Controller{
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

    public function schools(){
        if(!Session::get('login')){
            return redirect('/login')->with('alert', 'You must login first');
        }else{
            $userId = Session::get('id');
            $user = DB::table('user')->where('id', $userId)->first();
            $year = Date('Y');
            $school = DB::table('school')->orderBy('created_at', 'desc')->get();
            return view('Schools.schools', compact('year','school', 'user'));
        }
    }

    public function addSchool(Request $request){
       
        $id = $request -> id;
        $school_id = $request -> school_id;
        $name = $request -> name;
        $location = $request -> location;

        DB::insert('insert into school (id, school_id, name, location) values (?,?,?,?)', [$id, $school_id, $name, $location]);
        
    }

    public function editSchool(Request $request){       
        $id = $request -> id;
        $school_id = $request -> school_id;
        $name = $request -> name;
        $location = $request -> location;

        DB::table('school')->where('id', $id)->update(['school_id' => $school_id, 'name' => $name, 'location' => $location]);
    }

    public function deleteSchool(Request $request){       
        $id = $request -> id;        

        DB::table('school')->where('id', $id)->delete();
    }

    

}