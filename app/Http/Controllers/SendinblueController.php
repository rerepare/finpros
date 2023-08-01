<?php

namespace App\Http\Controllers;

//Illuminate
use Illuminate\Support\Facades\Http;

class SendinblueController
{
    private $apiKey;

    public function __construct()
    {
        $this->apiKey = env('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');
    }

    public function sendEmail($toEmail, $toName, $subject, $htmlContent)
    {
        $url = 'https://api.sendinblue.com/v3/smtp/email';

        $data = [
            'sender' => [
                'name' => 'Yayasan Gemilang',
                'email' => '
                almanshuriyyah.academic@gmail.com',
            ],
            'to' => [
                [
                    'email' => $toEmail,
                    'fullName' => $toName,
                ],
            ],
            'subject' => $subject,
            'htmlContent' => $htmlContent,
        ];

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'api-key' => $this->apiKey,
        ])->post($url, $data);

        if ($response->successful()) {
            return true;
        } else {
            return false;
        }
    }

    //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
}