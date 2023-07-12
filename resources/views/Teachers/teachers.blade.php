@extends('layouts.apps')
@section('title' , 'TEACHERS')
@section('content')
    <div id="login"></div>
    <script>
        let year = {!! json_encode($year) !!}   
        let user = {!! json_encode($user) !!}
        let teacher = {!! json_encode($teacher) !!}         
    </script>
    <script src="/js/Index.js"></script>
@endsection