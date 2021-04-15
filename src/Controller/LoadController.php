<?php

namespace App\Controller;

use App\Service\TransactionService;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Service\EntitySerializer;

class LoadController extends AbstractController
{

    private $accountsService;
    
    public function __construct(TransactionService $transactionService, EntitySerializer $entitySerializer)
    {
        $this->transactionService = $transactionService;
        $this->entitySerializer = $entitySerializer;
    }

    /**
     * @Route("/api/transfer_load", methods={"POST"}, name="transfer_load")
     */
    public function transferLoad(Request $request)
    {
        $content = json_decode($request->getContent(), true);

        $account = $this->getUser();
        $data = $this->entitySerializer->serializeEntity($account, [
            "agentId", 
            "otcGroup"
        ]);
        $content['agentData'] = $data;
        $response = $this->transactionService->transferLoad($content);
        
        if (array_key_exists('error', $response)) {
            return $this->json($response, JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }
        return $this->json($response);
    }

}
