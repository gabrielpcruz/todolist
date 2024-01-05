<?php

namespace App\Repository\User;

use App\Entity\User\UserEntity;
use App\Repository\AbstractRepository;

class UserRepository extends AbstractRepository
{
    /**
     * @var string
     */
    protected string $entityClass = UserEntity::class;

    /**
     * @param UserEntity $userEntity
     * @return void
     */
    public function save(UserEntity $userEntity): void
    {
        $query = "INSERT INTO user (name, email, password) values (:name, :email, :password)";

        $passwordHash = md5($userEntity->getPassword());

        $parameters = [
            ':name' => $userEntity->getName(),
            ':email' => $userEntity->getEmail(),
            ':password' => $passwordHash
        ];

        $this->insert($query, $parameters);
    }

    /**
     * @param UserEntity $user
     * @return false|UserEntity
     */
    public function findUser(UserEntity $user): UserEntity|false
    {
        $query = "SELECT * FROM user WHERE email = :email";

        $parameters = [
            ':email' => $user->email
        ];

        $user = $this->select($query, $parameters);

        if (!count($user)) {
            return false;
        }

        /** @var UserEntity $user */
        $user = array_shift($user);

        return $user;
    }

    /**
     * @param UserEntity $user
     * @param UserEntity $userRequest
     * @return bool
     */
    public function authenticate(UserEntity $user, UserEntity $userRequest): bool
    {
        $passwordRequest = md5($userRequest->getPassword());

        if ($user->getPassword() != $passwordRequest) {
            return false;
        }

        return true;
    }
}