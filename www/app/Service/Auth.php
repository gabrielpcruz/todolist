<?php

namespace App\Service;

use App\Entity\User\UserEntity;
use App\Repository\User\UserRepository;
use App\Utils\Session;

class Auth
{
    /**
     * @var UserRepository
     */
    private UserRepository $userRepository;

    public function __construct()
    {
        $this->userRepository = new UserRepository();
    }

    /**
     * @param $email
     * @param $password
     * @return bool
     */
    public function authenticate($email, $password): bool
    {
        $userRequest = new UserEntity();
        $userRequest->email = $email;
        $userRequest->password = $password;

        $userEntity = $this->userRepository->findUser($userRequest);

        if (!$userEntity) {
            return false;
        }

        if (!$this->userRepository->authenticate($userEntity, $userRequest)) {
            return false;
        }

        Session::setUser($userEntity);

        return true;
    }
}