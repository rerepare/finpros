@extends('layouts.apps')
@section('title' , 'USER')
@section('content')
    <div id="login"></div>
    <script>
        let year = {!! json_encode($year) !!}
        let user = {!! json_encode($user) !!}        
    </script>
    <script src="/js/Index.js"></script>
@endsection