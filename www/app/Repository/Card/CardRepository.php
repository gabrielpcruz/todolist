<?php

namespace App\Repository\Card;

use App\Entity\Card\CardEntity;
use App\Repository\Repository;

class CardRepository extends Repository
{
    /**
     * @var string
     */
    protected string $entityClass = CardEntity::class;

    public function moveCard(CardEntity $cardEntity)
    {

    }
}