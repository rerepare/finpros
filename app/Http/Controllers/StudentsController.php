<?php

namespace App\Http\Controllers;

//Illuminate
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Account;

use Auth;
use Validator;

class StudentsController extends Controller
{
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

    public function activeStudents()
    {
        if (!Session::get('login')) {
            return redirect('/login')->with('alert', 'You must login first');
        } else {
            $year = Date('Y');
            $student = DB::table('active_student')->orderBy('created_at', 'desc')->get();
            return view('ActiveStudents.students', compact('year', 'student'));
        }
    }

    public function addStudent(Request $request)
    {

        $id = $request->id;
        $student_id = $request->student_id;
        $image = $request -> image;
        $fullName = $request->fullName;
        $gender = $request->gender;
        $classType = $request->classType;
        $schoolPlacement = $request->schoolPlacement;
        $parentName = $request->parentName;
        $contact = $request->contact;
        $balance = $request->balance;

        DB::insert('insert into active_student (id, student_id, image, fullName, gender, classType, schoolPlacement, parentName, contact, balance) values (?,?,?,?,?,?,?,?,?,?)', [$id, $student_id, $image, $fullName, $gender, $classType, $schoolPlacement, $parentName, $contact, $balance]);
    }

    public function editStudent(Request $request)
    {
        $id = $request->id;
        $student_id = $request->student_id;
        $image = $request -> image;
        $fullName = $request->fullName;
        $gender = $request->gender;
        $classType = $request->classType;
        $schoolPlacement = $request->schoolPlacement;
        $parentName = $request->parentName;
        $contact = $request->contact;
        $balance = $request->balance;

        DB::table('active_student')->where('id', $id)->update(['student_id' => $student_id, 'image' => $image, 'fullName' => $fullName, 'gender' => $gender, 'classType' => $classType, 'schoolPlacement' => $schoolPlacement, 'parentName' => $parentName, 'contact' => $contact, 'balance' => $balance,]);
    }

    public function deleteStudent(Request $request)
    {
        $id = $request->id;

        DB::table('active_student')->where('id', $id)->delete();
    }
}
