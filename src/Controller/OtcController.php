<?php

namespace App\Controller;

use App\Service\API\RestClientService;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Service\EntitySerializer;

class OtcController extends AbstractController
{

    private $accountsService;
    
    public function __construct(EntitySerializer $entitySerializer, RestClientService $restClientService)
    {
        $this->restClientService = $restClientService;
        $this->entitySerializer = $entitySerializer;
    }

    /**
     * @Route("/api/otc/transaction/agent/get", methods={"POST"}, name="get_agent_transaction")
     */
    public function getAgentTransaction(Request $request)
    {
        $content = json_decode($request->getContent(), true);

        $account = $this->getUser();
        $data = $this->entitySerializer->serializeEntity($account, [
            "agentId"
        ]);
        $content['agentId'] = $data["agentId"];
        $response = $this->restClientService->requestOtc("POST", "/api/otc/transaction/agent/get", $content);
        
        if (array_key_exists('error', $response)) {
            return $this->json($response, JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }
        return $this->json($response);
    }

      /**
     * @Route("/api/otc/transaction/agent/get/default", methods={"GET"}, name="get_agent_transaction_default")
     */
    public function getAgentTransactionDefault(Request $request)
    {
        $account = $this->getUser();
        $data = $this->entitySerializer->serializeEntity($account, [
            "agentId"
        ]);
        $content['agentId'] = $data["agentId"];

        $response = $this->restClientService->requestOtc("POST", "/api/otc/transaction/agent/get/default", $content);
        
        if (array_key_exists('error', $response)) {
            return $this->json($response, JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }
        return $this->json($response);
    }
}
