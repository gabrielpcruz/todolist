<?php

namespace App\Repository\Card;

use App\Entity\Card\CardEntity;
use App\Error\TodoListException;
use App\Repository\AbstractRepository;
use App\Utils\Session;
use DI\DependencyException;
use DI\NotFoundException;
use Throwable;

class CardRepository extends AbstractRepository
{
    /**
     * @var string
     */
    protected string $entityClass = CardEntity::class;

    /**
     * @param array $attributes
     * @return CardEntity|null
     * @throws DependencyException
     * @throws NotFoundException
     * @throws Throwable
     */
    public function create(array $attributes): ?CardEntity
    {
        return $this->connection()->transaction(function () use ($attributes) {
            $card = new CardEntity();
            $attributes['user_id'] = Session::getUser()?->getId()? : null;

            $card->fill($attributes);
            $card->save();

            return $this->findOneBy(['id' => $card->getId()]);
        }, 3);
    }

    /**
     * @param int $id
     * @param array $parameters
     * @return CardEntity|null
     * @throws DependencyException
     * @throws NotFoundException
     * @throws Throwable
     */
    public function update(int $id, array $parameters): ?CardEntity
    {
        return $this->connection()->transaction(function () use ($id, $parameters) {
            $card = $this->findOneBy(['id' => $id]);

            $card->update($parameters);

            return $this->findOneBy(['id' => $id]);
        }, 3);
    }
}