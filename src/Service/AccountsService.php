<?php

namespace App\Service;

use Symfony\Component\HttpClient\HttpClient;
use App\Service\ValidationService;
use App\Repository\UserRepository;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

use App\Entity\PendingRegistrant;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class AccountsService
{   
    private $validationService;
    private $passwordEncoder;
    private $em;

    public function __construct(ValidationService $validationService, UserRepository $userRepository, EntityManagerInterface $em, UserPasswordEncoderInterface $passwordEncoder)
        {
            $this->validationService = $validationService;
            $this->userRepository = $userRepository;
            $this->em = $em;
            $this->passwordEncoder = $passwordEncoder;      
        }

    public function userRegister($data) 
    {
        $validate = $this->validationService->validateRegister($data);
        if (is_array($validate) && array_key_exists('error', $validate)) return $validate;

        $contactNumber = $data['contactNumber'];
        $emailAddress = $data['email'];
        $password = $data['password'];
        $firstName = $data['firstName'];
        $lastName = $data['lastName'];
        $companyName = $data["companyName"];

        //inserting registrant
      try {
        $user = new User();
        $registrant = new PendingRegistrant();
        $registrant->setFirstName($firstName);
        $registrant->setLastName($lastName);
        $registrant->setContactNumber($contactNumber);
        $registrant->setEmail($emailAddress);
        $registrant->setCompanyName($companyName);
        $registrant->setIsApprove(false);
        $registrant->setPassword($this->passwordEncoder->encodePassword($user, $password));
        $registrant->setCreatedAt();
        $registrant->setUpdatedAt();
        $this->em->persist($registrant);
        $this->em->flush();
      } catch (\Exception $e) {
          return ['error' => 'Server error. Try again later.'];
      }

      return $registrant;
    }
}