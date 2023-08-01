<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TransactionNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $transactionData;
    public $pdfContent;

    /**
     * Create a new message instance.
     *
     * @param  array  $transactionData
     * @param  string  $pdfContent
     * @return void
     */
    public function __construct($transactionData, $pdfContent)
    {
        $this->transactionData = $transactionData;
        $this->pdfContent = $pdfContent;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.transaction_success', ['transactionData' => $this->transactionData])
                    ->subject('Transaksi Berhasil')
                    ->attachData($this->pdfContent, 'transaction.pdf', ['mime' => 'application/pdf']);
    }
}
