<?php

namespace App\Repository\User;

use App\Entity\Card\CardEntity;
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
        return $this->findOneBy(['email' => $user->email]);
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

            $user = new UserEntity();
            $user->name = $attributes['name'];
            $user->email = $attributes['email'];
            $user->password = password_hash($attributes['password'],  PASSWORD_ARGON2ID );

            $user->save();

            return $user;
        }, 3);
    }
}