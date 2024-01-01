<?php

namespace App\Repository\Board;

use App\Entity\Board\BoardEntity;
use App\Entity\Card\CardEntity;
use App\Repository\Repository;
use Illuminate\Database\Eloquent\Collection;

class BoardRepository extends Repository
{
    /**
     * @var string
     */
    protected string $entityClass = BoardEntity::class;

    public function all(): Collection
    {
        return $this->getEntity()::with('cards')->get();
    }
}