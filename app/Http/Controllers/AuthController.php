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
            'userName' => 'required',
            'password' => 'required'
        ]);
        
        $userName = $request -> userName;
        $password = md5($request -> password);

        $cekUser = DB::table('user')->where('userName' , $userName)->where('password' , $password)->first();

        if($cekUser){
            Session::flush();
            Session::put('id', $cekUser -> id);
            Session::put('userName' , $cekUser->userName);
            Session::put('name' , $cekUser->name);            
            Session::put('login' , TRUE);
          }       
    }

    public function logout(){
        Session::flush();
    }

    public function dashboard(){
       
        if(!Session::get('login')){
            return redirect('/login')->with('alert', 'You must login first');
        }else{
            $year = Date('Y');
            $totalUser = DB::table('user')->get()->count();
            $totalStudent = DB::table('active_student')->get()->count();
            $student = DB::table('active_student')->get();
            return view('User.dashboard',  compact('year', 'totalUser', 'totalStudent','student') );
        }
    }

    public function userPage(){
        if(!Session::get('login')){
            return redirect('/login')->with('alert', 'You must login first');
        }else{
            $year = Date('Y');
            $user = DB::table('user')->orderBy('created_at', 'desc')->get();
        return view('User.user',  compact('year','user') );
        }
    }

    public function register(){
        if(!Session::get('login')){
            return redirect('/login')->with('alert', 'You must login first');
        }else{
            $year = Date('Y');
            $user = DB::table('user')->orderBy('created_at', 'desc')->get();
        return view('User.register',  compact('year', 'user') );
        }
    }

    public function registration(Request $request){
        $id = $request -> id;
        $user_id = $request -> user_id;
        $images = $request -> image;
        $name = $request -> name;
        $userName = $request -> userName;
        $password = md5($request -> password);
        $isSuperAdmin = $request -> isSuperAdmin;

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

            file_put_contents('images/user/'.$photofilename,base64_decode($image));

            DB::insert('insert into user (id, user_id, image, name, userName, password, isSuperAdmin) values (?,?,?,?,?,?,?)', [$id, $user_id, $photofilename, $name, $userName, $password, $isSuperAdmin]);
        }
    }

    public function editUser(Request $request){       
        $id = $request -> id;
        $user_id = $request -> user_id;
        $images = $request -> image;
        $name = $request -> name;
        $userName = $request -> userName;
        $password = md5($request -> password);
        $isSuperAdmin = $request -> isSuperAdmin;

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
    
                file_put_contents('images/user/'.$photofilename,base64_decode($image));
    
                DB::table('user')->where('id', $id)->update(['user_id' => $user_id, 'image' => $photofilename, 'name' => $name, 'userName' => $userName, 'password' => $password, 'isSuperAdmin' => $isSuperAdmin]);
            }
        }
        else{
            DB::table('user')->where('id', $id)->update(['user_id' => $user_id, 'name' => $name, 'userName' => $userName, 'password' => $password, 'isSuperAdmin' => $isSuperAdmin]);
        }
    }

    public function deleteUser(Request $request){       
        $id = $request -> id;        

        DB::table('user')->where('id', $id)->delete();
    }
   
}