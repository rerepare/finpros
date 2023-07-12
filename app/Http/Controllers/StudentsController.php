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
        if(!Session::get('login')){
            return redirect('/login')->with('alert', 'You must login first');
        } else {
            $userId = Session::get('id');
            $user = DB::table('user')->where('id', $userId)->first();
            $year = Date('Y');
            $student = DB::table('active_student')->orderBy('created_at', 'desc')->get();
            return view('ActiveStudents.students', compact('year', 'student', 'user'));
        }
    }

    public function addStudent(Request $request){
        $id = $request->id;
        $student_id = $request->student_id;
        $school_id = $request->school_id;
        $images = $request -> image;
        $fullName = $request->fullName;
        $gender = $request->gender;
        $classType = $request->classType;
        $parentName = $request->parentName;
        $contact = $request->contact;
        $email = $request->email;
        $balance = $request->balance;

        for ($i=0; $i < count($images); $i++) {     
                      
            if(str_starts_with($images[$i],'data:image/jpeg;base64,')){
                $photo = str_replace('data:image/jpeg;base64,','',$images[$i]);
                $photoextention = '.jpeg';
            }else if(str_starts_with($images[$i],'data:image/jpg;base64,')){
                $photo = str_replace('data:image/jpg;base64,','',$images[$i]);
                $photoextention = '.jpg';
            }else if(str_starts_with($images[$i],'data:image/png;base64,')){
                $photo = str_replace('data:image/png;base64,','',$images[$i]);
                $photoextention = '.png';
            }else if(str_starts_with($images[$i],'data:image/jfif;base64,')){
                $photo = str_replace('data:image/jfif;base64,','',$images[$i]);
                $photoextention = '.jfif';
            }    

            $photofilename = rand(1111111,99999999999) . $photoextention;            
            $image         = str_replace(' ','+',$photo);   

            file_put_contents('images/student/'.$photofilename,base64_decode($image));

            DB::insert('insert into active_student (id, student_id, school_id, image, fullName, gender, classType, parentName, contact, email, balance) values (?,?,?,?,?,?,?,?,?,?,?)', [$id, $student_id, $school_id, $photofilename, $fullName, $gender, $classType, $parentName, $contact, $email, $balance]);
        }        
    }

    public function editStudent(Request $request)
    {
        $id = $request->id;
        $student_id = $request->student_id;
        $school_id = $request->school_id;
        $images = $request -> image;
        $fullName = $request->fullName;
        $gender = $request->gender;
        $classType = $request->classType;
        $parentName = $request->parentName;
        $contact = $request->contact;
        $email = $request->email;
        $balance = $request->balance;

        if(count($images) > 0)
        {
            for ($i=0; $i < count($images); $i++) {
                if(str_starts_with($images[$i],'data:image/jpeg;base64,')){
                    $photo = str_replace('data:image/jpeg;base64,','',$images[$i]);
                    $photoextention = '.jpeg';
                }else if(str_starts_with($images[$i],'data:image/jpg;base64,')){
                    $photo = str_replace('data:image/jpg;base64,','',$images[$i]);
                    $photoextention = '.jpg';
                }else if(str_starts_with($images[$i],'data:image/png;base64,')){
                    $photo = str_replace('data:image/png;base64,','',$images[$i]);
                    $photoextention = '.png';
                }else if(str_starts_with($images[$i],'data:image/jfif;base64,')){
                    $photo = str_replace('data:image/jfif;base64,','',$images[$i]);
                    $photoextention = '.jfif';
                }    

                $photofilename = rand(1111111,99999999999) . $photoextention;            
                $image         = str_replace(' ','+',$photo);   

                file_put_contents('images/student/'.$photofilename,base64_decode($image));

                DB::table('active_student')->where('id', $id)->update(['student_id' => $student_id, 'school_id' => $school_id, 'image' => $photofilename, 'fullName' => $fullName, 'gender' => $gender, 'classType' => $classType, 'parentName' => $parentName, 'contact' => $contact, 'email' => $email, 'balance' => $balance,]);
            }           
        }
        else{
            DB::table('active_student')->where('id', $id)->update(['student_id' => $student_id, 'school_id' => $school_id, 'fullName' => $fullName, 'gender' => $gender, 'classType' => $classType, 'parentName' => $parentName, 'contact' => $contact, 'email' => $email, 'balance' => $balance,]);
        }
    }

    public function deleteStudent(Request $request)
    {
        $id = $request->id;

        DB::table('active_student')->where('id', $id)->delete();
    }
}
