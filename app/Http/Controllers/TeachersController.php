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

    public function teachers()
    {
        if(!Session::get('login')){
            return redirect('/login')->with('alert', 'You must login first');
        }else{
            $year = Date('Y');
            $teacher = DB::table('teacher')->orderBy('created_at', 'desc')->get();
            return view('Teachers.teachers', compact('year','teacher'));
        }
    }

    public function addTeacher(Request $request){
        $id = $request -> id;
        $teacher_id = $request -> teacher_id;
        $school_id = $request -> school_id;
        $images = $request -> image;
        $fullName = $request -> fullName;
        $gender = $request -> gender;
        $classType = $request -> classType;
        $contact = $request -> contact;

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

            file_put_contents('images/teacher/'.$photofilename,base64_decode($image));

            DB::insert('insert into teacher (id, teacher_id, school_id, image, fullName, gender, classType, contact) values (?,?,?,?,?,?,?,?)', [$id, $teacher_id, $school_id, $photofilename, $fullName, $gender, $classType, $contact]); 
        }
    }

    public function editTeacher(Request $request){       
        $id = $request -> id;
        $teacher_id = $request -> teacher_id;
        $school_id = $request -> school_id;
        $images = $request -> image;
        $fullName = $request -> fullName;
        $gender = $request -> gender;
        $classType = $request -> classType;
        $contact = $request -> contact;

        if(count($images) > 0)
        {
            for ($i=0; $i < count($images); $i++){
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
    
                file_put_contents('images/teacher/'.$photofilename,base64_decode($image));
    
                DB::table('teacher')->where('id', $id)->update(['teacher_id' => $teacher_id, 'image' => $photofilename, 'school_id' => $school_id,  'fullName' => $fullName, 'gender' => $gender, 'classType' => $classType, 'contact' => $contact,]);
            }
        }
        else{
            DB::table('teacher')->where('id', $id)->update(['teacher_id' => $teacher_id, 'school_id' => $school_id,  'fullName' => $fullName, 'gender' => $gender, 'classType' => $classType, 'contact' => $contact,]);
        }
    }

    public function deleteTeacher(Request $request){       
        $id = $request -> id;        

        DB::table('teacher')->where('id', $id)->delete();
    }
}