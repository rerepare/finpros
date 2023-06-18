<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/homes', function () {
    return view('layouts.app');
});

// Route::get('/', function () {
//     return view('layouts.apps');
// });

// Auth::routes();

//user
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/login', [App\Http\Controllers\AuthController::class,'login']);

Route::post('/login_check', [App\Http\Controllers\AuthController::class,'login_check']);

Route::post('/logout', [App\Http\Controllers\AuthController::class,'logout']);

Route::get('/user', [App\Http\Controllers\AuthController::class,'userPage']);

Route::get('/register', [App\Http\Controllers\AuthController::class,'register']);

Route::post('/registration', [App\Http\Controllers\AuthController::class,'registration']);

Route::post('/uploadImage', [App\Http\Controllers\AuthController::class,'uploadImage']);

Route::post('/editUser', [App\Http\Controllers\AuthController::class,'editUser']);

Route::post('/editUser2', [App\Http\Controllers\AuthController::class,'editUser2']);

Route::post('/deleteUser', [App\Http\Controllers\AuthController::class,'deleteUser']);

//dashboard
Route::get('/dashboard', [App\Http\Controllers\AuthController::class,'dashboard']);

//school
Route::get('/schools', [App\Http\Controllers\SchoolsController::class,'schools']);

Route::post('/addSchool', [App\Http\Controllers\SchoolsController::class,'addSchool']);

Route::post('/editSchool', [App\Http\Controllers\SchoolsController::class,'editSchool']);

Route::post('/deleteSchool', [App\Http\Controllers\SchoolsController::class,'deleteSchool']);

//teacher
Route::get('/teachers', [App\Http\Controllers\TeachersController::class,'teachers']);

Route::post('/addTeacher', [App\Http\Controllers\TeachersController::class,'addTeacher']);

Route::post('/editTeacher', [App\Http\Controllers\TeachersController::class,'editTeacher']);

Route::post('/deleteTeacher', [App\Http\Controllers\TeachersController::class,'deleteTeacher']);

//student
Route::get('/activeStudents', [App\Http\Controllers\StudentsController::class,'activeStudents']);

Route::post('/addStudent', [App\Http\Controllers\StudentsController::class,'addStudent']);

Route::post('/editStudent', [App\Http\Controllers\StudentsController::class,'editStudent']);

Route::post('/deleteStudent', [App\Http\Controllers\StudentsController::class,'deleteStudent']);

//transaction
Route::get('/transaction', [App\Http\Controllers\TransactionController::class,'transaction']);

Route::post('/addTransaction', [App\Http\Controllers\TransactionController::class,'addTransaction']);

Route::get('/history', [App\Http\Controllers\TransactionController::class,'history']);

Route::get('/report', [App\Http\Controllers\TransactionController::class,'transaction']);

Route::post('/deleteHistory', [App\Http\Controllers\TransactionController::class,'history']);

Route::get('/payment_h', [App\Http\Controllers\TransactionController::class,'history']);

Route::get('/saving_h', [App\Http\Controllers\TransactionController::class,'history']);

Route::get('/dataSavings', [App\Http\Controllers\TransactionController::class,'dataSavings']);