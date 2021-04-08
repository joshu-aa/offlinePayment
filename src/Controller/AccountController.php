<?php

namespace App\Controller;

use App\Service\AccountsService;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class AccountController extends AbstractController
{

    private $accountsService;
    
    public function __construct(AccountsService $accountsService)
    {
        $this->accountsService = $accountsService;
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
}
