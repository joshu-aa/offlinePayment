<?php

namespace App\Service\API;

use Symfony\Component\HttpClient\HttpClient;

class RestClientService
{
    private $otcUrl;
    private $accountsUrl;
    
    public function __construct()
    {
        $this->otcUrl = $_ENV['OTC_URL'];
        $this->accountsUrl = $_ENV['ACCOUNTS_URL'];

        $this->accountsHeaders = [
            'Token' => $_ENV['ACCOUNTS_TOKEN'],
            'Identity' => $_ENV['ACCOUNTS_ID'],
            'Content-Type' => 'application/json'
        ];
    }

    public function transactionOtc($method, $endpoint, $data, $otcHeaders)
    {
        $client = HttpClient::create();
        
        try {        
            $response = $client->request($method, $this->otcUrl . $endpoint, ['headers' => $otcHeaders, 
            'json' => $data]);
            
            if ($response->getStatusCode() >= 400 && $response->getStatusCode() <= 500) {
                return $response->toArray(false);
            } else if ($response->getStatusCode() === 500) {
                return ['error' => 'Server errorses'];
            } else {
                $data = $response->toArray();
                return $data;
            }
        } catch (\Exception $e) {
            return ['error' => $e];
        }
    }

    public function verifyAccounts($method, $endpoint, $data)
    {
        $client = HttpClient::create();
        
        try {        
            $response = $client->request($method, $this->accountsUrl . $endpoint, ['headers' => $this->accountsHeaders, 
            'json' => $data]);
            if ($response->getStatusCode() >= 400 && $response->getStatusCode() <= 500) {
                return $response->toArray(false);
            } else if ($response->getStatusCode() === 500) {
                return ['error' => 'Server error'];
            } else {
                $data = $response->toArray();
                return $data;
            }
        } catch (\Exception $e) {
            return ['error' => $e];
        }
    }

    
}