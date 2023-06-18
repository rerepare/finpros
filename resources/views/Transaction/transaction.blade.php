@extends('layouts.apps')
@section('title' , 'TRANSACTION')
@section('content')
    <div id="login"></div>
    <script>
        let year = {!! json_encode($year) !!}
        let student = {!! json_encode($student) !!}
        let user = {!! json_encode($user) !!}  
    </script>
    <script src="/js/Index.js"></script>
@endsection