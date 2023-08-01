<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Transaction History</title>
    <!-- Include any required CSS styles here -->
</head>
<body>
    <!-- Format the transaction data using HTML and Blade syntax -->
    @if(count($transactionData['transactionHistory']) > 0)
    <h3>Transaction History:</h3>
    <table border="1" cellpadding="5">
        <thead>
            <tr>
                <th>Tanggal</th>
                <th>Tipe Transaksi</th>
                <th>Jumlah</th>
                <th>Saldo</th>
                <th>Keterangan</th>
            </tr>
        </thead>
        <tbody>
            @foreach($transactionData['transactionHistory'] as $transaction)
                <tr>
                    <td>{{ $transaction->created_at }}</td>
                    <td>{{ $transaction->transType }}</td>
                    <td>{{ $transaction->amount }}</td>
                    <td>{{ $transaction->newBalance }}</td>
                    <td>{{ $transaction->description }}</td>
                    <!-- Add other table data as needed -->
                </tr>
            @endforeach
        </tbody>
    </table>
    @endif
    <!-- Add other transaction data as needed -->
</body>
</html>