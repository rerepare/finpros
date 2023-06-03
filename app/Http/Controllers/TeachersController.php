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

class TeachersController extends Controller{
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

    public function teachers(){
        if(!Session::get('login')){
            return redirect('/login')->with('alert', 'You must login first');
        }else{
            $year = Date('Y');
            $teacher = DB::table('teacher')->get();
            return view('Teachers.teachers', compact('year','teacher'));
        }
    }

    public function addTeacher(Request $request){
       
        $id = $request -> id;
        $teacher_id = $request -> teacher_id;
        $image = $request -> image;
        $name = $request -> name;
        $gender = $request -> gender;
        $placement = $request -> placement;
        $classType = $request -> classType;
        $contact = $request -> contact;

        DB::insert('insert into teacher (id, teacher_id, image, name, gender, placement, classType, contact) values (?,?,?,?,?,?,?,?)', [$id, $teacher_id, $image, $name, $gender, $placement, $classType, $contact]); 
    }

    public function editTeacher(Request $request){       
        $id = $request -> id;
        $teacher_id = $request -> teacher_id;
        $image = $request -> image;
        $name = $request -> name;
        $gender = $request -> gender;
        $placement = $request -> placement;
        $classType = $request -> classType;
        $contact = $request -> contact;

        DB::table('teacher')->where('id', $id)->update(['teacher_id' => $teacher_id, 'image' => $image, 'name' => $name, 'gender' => $gender, 'placement' => $placement, 'classType' => $classType, 'contact' => $contact,]);
    }

    public function deleteTeacher(Request $request){       
        $id = $request -> id;        

        DB::table('teacher')->where('id', $id)->delete();
    }
}