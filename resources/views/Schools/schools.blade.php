@extends('layouts.apps')
@section('title' , 'SCHOOLS')
@section('content')
    <div id="login"></div>
    <script>
        let year = {!! json_encode($year) !!} 
        let school = {!! json_encode($school) !!}        
    </script>
    <script src="/js/Index.js"></script>
@endsection