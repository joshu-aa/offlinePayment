<?php

namespace App\Service;

use Symfony\Component\HttpClient\HttpClient;
use App\Service\ValidationService;
use App\Repository\UserRepository;
use App\Repository\OtpRepository;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

use App\Entity\PendingRegistrant;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class AccountsService
{   
    private $validationService;
    private $passwordEncoder;
    private $otpRepository;
    private $em;

    public function __construct(OtpRepository $otpRepository, ValidationService $validationService, UserRepository $userRepository, EntityManagerInterface $em, UserPasswordEncoderInterface $passwordEncoder)
        {
            $this->validationService = $validationService;
            $this->otpRepository = $otpRepository;
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

    public function forgotPassword($data)
    {
        $account = $data["account"];
        $password = $data["password"];

        $validate = $this->validationService->validatePassword($password);
        if (is_array($validate) && array_key_exists('error', $validate)) return $validate;

        $otp = $this->otpRepository->findOneBy(['account' => $account]);

        if (!is_null($otp) && $otp->getOtpVerified()) {
            $time = $otp->getUpdatedAt()->format('Y-m-d H:i:s');
            if (strtotime($time) > strtotime("-5 minutes")) {
                if (strpos($account, '@') && strpos($account, '.')) {
                    $user = $this->userRepository->findOneBy([
                        'email' => $account
                    ]);
                } else if (substr($account, 0, 2) === '09' && strlen($account) === 11){
                    $user = $this->userRepository->findOneBy([
                        'contactNumber' => $account
                    ]);
                } else {
                    return ['error' => "Invalid account"];
                }
                $user->setPassword(
                    $this->passwordEncoder->encodePassword($user, $password)
                );
                // $user->setUpdatedAt();
                $this->em->persist($user);
                try {
                    $this->em->flush();
                } catch (\Exception $e) {
                    return ['error' => 'Error changing password'];
                }
        
                // $action = new UserAction();
                // $action->setSubscriberId($user->getSubscriberId());
                // $action->setAction("Password changed");
                // $action->setTimestamp();
                // $this->em->persist($action);
                // $this->em->flush();

                $otp->setOtpVerified(false);
                $otp->setUpdatedAt();
                $this->em->persist($otp);
                try {
                    $this->em->flush();
                } catch (\Exception $e) {
                    return ['error' => 'Error otp'];
                }

                return ['success' => 'Password updated'];
            } else if (strtotime($time) < strtotime("-5 minutes")) {
                return ['error' => 'Invalid request'];
            }
        } else if (is_null($otp) || !$otp->getOtpVerified()) {
            return ['error' => 'Invalid request'];
        }
    }
}