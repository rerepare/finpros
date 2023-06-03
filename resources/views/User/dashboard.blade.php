@extends('layouts.apps')
@section('title' , 'DASHBOARD')
@section('content')
    <div id="login"></div>
    <script>
        let year = {!! json_encode($year) !!}        
    </script>
    <script src="/js/Index.js"></script>
@endsection