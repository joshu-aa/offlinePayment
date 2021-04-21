<?php

namespace App\Controller;

use App\Service\AccountsService;
use App\Service\OtpService;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Service\EntitySerializer;
use App\Service\API\RestClientService;

class AccountController extends AbstractController
{

    private $accountsService;
    
    public function __construct(otpService $otpService, AccountsService $accountsService, EntitySerializer $entitySerializer, RestClientService $restClientService)
    {
        $this->accountsService = $accountsService;
        $this->entitySerializer = $entitySerializer;
        $this->restClientService = $restClientService;
        $this->otpService = $otpService;
    }

    /**
     * @Route("/account/register", methods={"POST"}, name="user_register")
     */
    public function userRegister(Request $request)
    {
        $content = json_decode($request->getContent(), true);
        $response = $this->accountsService->userRegister($content);

        if (array_key_exists('error', $response)) {
            return $this->json($response, JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }
        return $this->json($response);
    }

    /**
     * @Route("/api/user", name="user", methods={"GET"})
     */
    public function getAccount()
    {
        $account = $this->getUser();

        $data = $this->entitySerializer->serializeEntity($account, [
            "agentId", 
            "contactNumber", 
            "firstName", 
            "lastName",
            "email",
            "otcGroup",
            "roles"
        ]);
        return new JsonResponse($data);
    }

       /**
     * @Route("/api/verify/subscriber", name="verify_subscriber", methods={"POST"})
     */
    public function verifySubscriber(Request $request)
    {
        $content = json_decode($request->getContent(), true);
        if ($content['account'] == "") {
            return new JsonResponse(['isSuccess' => 'loading']);
        }
        $response = $this->restClientService->verifyAccounts('POST', '/api/account/verify_user', $content);

        if (array_key_exists("error", $response)) {
            return new JsonResponse($response);
        }

        if(array_key_exists("subscriberId", $response)){
            $response = [
                'isSuccess' => "Success",
                'subscriberId' => $response['subscriberId'],
                'fullName'     => $response['firstName']. ' ' .$response['lastName'],
                'unitNumber'   => $response['unitNumber']
            ];
            return new JsonResponse($response);
        }
        return new JsonResponse($response);
        
    }
}
