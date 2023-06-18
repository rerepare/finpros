@extends('layouts.apps')
@section('title' , 'DASHBOARD')
@section('content')
    <div id="login"></div>
    <script>
        let year = {!! json_encode($year) !!}
        let totalUser = {!! json_encode($totalUser) !!}
        let totalStudent = {!! json_encode($totalStudent) !!}
        let student = {!! json_encode($student) !!}    
    </script>
    <script src="/js/Index.js"></script>
@endsection