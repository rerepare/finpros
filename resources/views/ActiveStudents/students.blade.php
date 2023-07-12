@extends('layouts.apps')
@section('title' , 'ACTIVE STUDENTS')
@section('content')
    <div id="login"></div>
    <script>
        let year = {!! json_encode($year) !!}
        let user = {!! json_encode($user) !!}
        let student = {!! json_encode($student) !!}       
    </script>
    <script src="/js/Index.js"></script>
@endsection