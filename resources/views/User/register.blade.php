@extends('layouts.apps')
@section('title' , 'REGISTER')
@section('content')
    <div id="login"></div>
    <script>   
        let year = {!! json_encode($year) !!}
        let user = {!! json_encode($user) !!}
        let userTable = {!! json_encode($userTable) !!}
    </script>
    <script src="/js/Index.js"></script>
@endsection