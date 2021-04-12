<?php

namespace App\Service;

use App\Repository\UserRepository;

class ValidationService
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function validateRegister($data)
    {
        if (empty($data['password']) || empty($data['firstName']) || empty($data['lastName'])) return ['error' => 'A required field is missing.'];

        if (empty($data['companyName'])) return ['error' => 'Please put your company name'];

        if (empty($data['contactNumber'])) return ['error' => 'Please put your contactNumber'];

        if (empty($data['email'])) return ['error' => 'Please put your email'];

        if (strlen($data['contactNumber']) !== 11) return ['error' => 'contact number must be 11 characters long.'];
        
        if (strlen($data['password']) < 6) return ['error' => 'Password must be at least 6 characters long.'];

        if (!is_null($data['contactNumber'])) {
            $contact = $this->userRepository->findOneBy(['contactNumber' => $data['contactNumber']]);
            if ($contact !== null) { 
                return ['error' => 'contact number is already existing'];
            }
        }

        if (!is_null($data['email'])) {
            $email = $this->userRepository->findOneBy(['email' => $data['email']]);
            if ($email !== null) { 
                return ['error' => 'email is already existing'];
            }
        }
    }

    // public function validatePassword($password)
    // {
    //     if (strlen($password) < 6) return ['error' => 'Password must be at least 6 characters long.'];
    // }

    // public function validateOtp($data) 
    // {
    //     if (empty($data['account'])) return ['message' => 'Account is required.']; 
        
    //     if (empty($data['type'])) return ['message' => 'Type is required.'];

    //     if (!is_string($data['type']) || strlen($data['type']) > 1) return ['message' => 'Invalid data for type'];
    // }

    // public function validateUpdateUnitNumber($data)
    // {
    //     if (!(strlen($data['unitNumber']) >= 3 && strlen($data['unitNumber']) <= 5 )) return ['error' => 'Unit number must have at least 3 characters.'];
    // }
}