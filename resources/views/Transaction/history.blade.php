@extends('layouts.apps')
@section('title' , 'TRANSACTION')
@section('content')
    <div id="login"></div>
    <script>  
        let allHistory = {!! json_encode($allHistory) !!}    
        let historyPayment = {!! json_encode($historyPayment) !!}
        let historySaving = {!! json_encode($historySaving) !!}
        let user = {!! json_encode($user) !!}  
    </script>
    <script src="/js/Index.js"></script>
@endsection