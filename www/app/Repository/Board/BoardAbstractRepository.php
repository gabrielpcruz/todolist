<?php

namespace App\Repository\Board;

use App\Entity\Board\BoardEntity;
use App\Repository\AbstractRepository;
use Illuminate\Database\Eloquent\Collection;

class BoardAbstractRepository extends AbstractRepository
{
    /**
     * @var string
     */
    protected string $entityClass = BoardEntity::class;

    /**
     * @return Collection
     */
    public function all(): Collection
    {
        return $this->getEntity()::with('cards')->get();
    }
}