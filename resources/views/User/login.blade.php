@extends('layouts.app')
@section('title' , 'LOGIN')
@section('content')
    <div id="login"></div>
    <script>
        let year = {!! json_encode($year) !!}   
        let user = {!! json_encode($user->toArray()) !!}     
    </script>
    <script src="/js/Index.js"></script>
@endsection