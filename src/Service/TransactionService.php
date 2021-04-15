<?php

namespace App\Service;

use App\Repository\UserRepository;
use App\Service\API\RestClientService;

use App\Service\ValidationService;

class TransactionService
{
    private $userRepository;
    private $restClientService;
    private $woofyOtcToken;
    private $woofyOtcId;

    public function __construct(UserRepository $userRepository, RestClientService $restClientService, ValidationService $validationService )
    {
        $this->userRepository = $userRepository;
        $this->restClientService = $restClientService;
        $this->validationService = $validationService;
        $this->woofyOtcToken = $_ENV['WOOFY_OTC_TOKEN'];
        $this->woofyOtcId = $_ENV['WOOFY_OTC_ID'];
    }

    public function transferLoad($data) {
        
        //validate data
        $validate = $this->validationService->validateLoadTransaction($data);
        if (is_array($validate) && array_key_exists('error', $validate)) return $validate;

        if($data['agentData']['otcGroup'] == 'Woofy') {
            $token = $this->woofyOtcToken;
            $id = $this->woofyOtcId;
        }

        $header = [
            'Identity' => $id,
            'API-KEY'  => $token,
            'Content-Type' => 'application/json'
        ];

        $dataTosend = [
            'account' => $data['account'],
            'amount' => $data['amount'],
            'agentId' => $data['agentData']['agentId']
        ];

        //send request to OTC
        $request = $this->restClientService->transactionOtc("POST", "/api/otc/transaction/offline", $dataTosend, $header);
        return $request;
    }

}