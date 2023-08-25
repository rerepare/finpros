<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Transaction History</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .title-container {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 20px 0; /* Add some spacing around the title and image */
        }
        .title-image {
            width: 60px; /* Adjust the image width as needed */
            height: auto;
            margin-right: 10px; /* Add some spacing between image and title */
        }
        .title-text {
            color: #007bff;
            text-align: center;
            margin: 0;
            font-size: 24px; /* Adjust font size as needed */
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <!-- Format the transaction data using HTML and Blade syntax -->
    @if(count($transactionData['transactionHistory']) > 0)
    <div class="title-container">
        <h4 class="title-text">LAPORAN TABUNGAN SISWA</h4>
    </div>

    <table>
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
            @php
                $sortedTransactions = collect($transactionData['transactionHistory'])
                    ->sortBy('created_at');
            @endphp

            @foreach($sortedTransactions as $transaction)
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

    <div class="footer">
        <p>Jika Anda memiliki pertanyaan atau masalah, jangan ragu untuk menghubungi kami. Terima kasih.</p>
        <br>
        <p>Hormat Kami,</p>
        <p>TKIT AL MANSHURIYYAH</p>
    </div>
    @endif
    <!-- Add other transaction data as needed -->
</body>
</html>

