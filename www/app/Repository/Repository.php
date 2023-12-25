<?php

namespace App\Repository;


use App\Entity\Entity;
use Illuminate\Database\Eloquent\Collection;

abstract class Repository
{
    /**
     * @var Entity|null
     */
    protected ?Entity $entity;

    /**
     * @var string
     */
    protected string $entityClass = '';

    public function __construct()
    {
        $this->entity = $this->getEntity();
    }

    /**
     * @return Entity
     */
    protected function getEntity(): Entity
    {
        if (!class_exists($this->entityClass)) {
            throw new \DomainException('sdsad');
        }

        return new $this->entityClass();
    }


    /**
     * @return Collection
     */
    public function all(): Collection
    {
        return $this->getEntity()::all();
    }
}