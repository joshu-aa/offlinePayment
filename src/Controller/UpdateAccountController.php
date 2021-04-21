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

class UpdateAccountController extends AbstractController
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
     * @Route("/api/account/forgot_password", methods={"POST"}, name="forgot_password")
     */
    public function forgotPassword(Request $request)
    {
        $content = json_decode($request->getContent(), true);
        $response = $this->accountsService->forgotPassword($content);

        if (array_key_exists('error', $response)) {
            return $this->json($response, JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }
        return $this->json($response);
    }
}
