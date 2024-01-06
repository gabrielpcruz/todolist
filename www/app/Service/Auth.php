<?php

namespace App\Service;

use App\Entity\User\UserEntity;
use App\Error\AuthenticationException;
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
     * @throws AuthenticationException
     */
    public function authenticate($email, $password): bool
    {
        $userRequest = new UserEntity();
        $userRequest->email = $email;
        $userRequest->password = $password;

        $userEntity = $this->userRepository->findUser($userRequest);

        if (!$userEntity) {
            throw new AuthenticationException('Usuário ou senha inválidos');
        }

        if (!$this->userRepository->authenticate($userEntity, $userRequest)) {
            throw new AuthenticationException('Usuário ou senha inválidos');
        }

        Session::setUser($userEntity);

        return true;
    }
}