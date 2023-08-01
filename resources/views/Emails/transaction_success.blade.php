<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Notification</title>
</head>
<body>
    <p>Assalamualaikum Wr. Wb.</p>
    <p>Kami informasikan bahwa transaksi Anda telah berhasil diproses.</p>
    
    <div>Detail Transaksi:</div>
    <div>ID Siswa: {{ $transactionData['student_id'] }}</div>
    <div>Nama Siswa: {{ $transactionData['studentName'] }}</div>
    <div>Jumlah: {{ $transactionData['amount'] }}</div>
    <div>Keterangan: {{ $transactionData['description'] }}</div>
    <div>Saldo saat ini: {{ $transactionData['newBalance'] }}</div>

    <p>Jika Anda memiliki pertanyaan atau masalah, jangan ragu untuk menghubungi kami. Terima kasih.
    <br/>
    <p>Hormat Kami,</p>
    <p>TKIT AL MANSHURIYYAH</p>
</body>
</html>