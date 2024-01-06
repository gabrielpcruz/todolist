<?php

namespace App\Repository\User;

use App\Entity\User\UserEntity;
use App\Repository\AbstractRepository;
use DI\DependencyException;
use DI\NotFoundException;
use Throwable;

class UserRepository extends AbstractRepository
{
    /**
     * @var string
     */
    protected string $entityClass = UserEntity::class;

    /**
     * @param UserEntity $user
     * @return UserEntity|null
     */
    public function findUser(UserEntity $user): ?UserEntity
    {
        return $this->findOneBy(['email' => $user->getEmail()]);
    }

    /**
     * @param UserEntity $user
     * @param UserEntity $userRequest
     * @return bool
     */
    public function authenticate(UserEntity $user, UserEntity $userRequest): bool
    {
        if (!password_verify($userRequest->getPassword(), $user->getPassword())) {
            return false;
        }

        return true;
    }

    /**
     * @param array $attributes
     * @return UserEntity|null
     * @throws DependencyException
     * @throws NotFoundException
     * @throws Throwable
     */
    public function create(array $attributes): ?UserEntity
    {
        return $this->connection()->transaction(function () use ($attributes) {
            $user = new UserEntity($attributes);

            $password_hash = password_hash($attributes['password'], PASSWORD_ARGON2ID);
            $user->setPassword($password_hash);

            $user->save();

            return $user;
        }, 3);
    }
}