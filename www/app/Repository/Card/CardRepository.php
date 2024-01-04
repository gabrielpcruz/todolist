<?php

namespace App\Repository\Card;

use App\Entity\Card\CardEntity;
use App\Repository\Repository;
use DI\DependencyException;
use DI\NotFoundException;
use stdClass;
use Throwable;

class CardRepository extends Repository
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
            $card->fill($attributes);
            $card->save();

            return $card;
        }, 3);
    }

    /**
     * @param int $id
     * @param array $parameters
     * @return bool
     * @throws DependencyException
     * @throws NotFoundException
     * @throws Throwable
     */
    public function update(int $id, array $parameters): bool
    {
        return $this->connection()->transaction(function () use ($id, $parameters) {
            $card = $this->findOneBy(['id' => $id]);

            return $card->update($parameters);
        }, 3);
    }
}