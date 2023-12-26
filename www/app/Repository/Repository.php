<?php

namespace App\Repository;


use App\Entity\Entity;
use Illuminate\Database\Eloquent\Builder;
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
            throw new \DomainException('Entity class not Defined!');
        }

        return new $this->entityClass();
    }

    /**
     * @return Builder
     */
    public function query(): Builder
    {
        return $this->getEntity()->newQuery();
    }

    /**
     * @param array $params
     * @param array $with
     *
     * @return Builder
     */
    protected function queryWhere(array $params, array $with = []): Builder
    {
        $query = $this->query();

        foreach ($params as $key => $value) {
            $query->where($key, '=', $value);
        }

        if (!empty($with)) {
            $query->with($with);
        }

        return $query;
    }

    /**
     * @return Collection
     */
    public function all(): Collection
    {
        return $this->getEntity()::all();
    }

    /**
     * @param array $params
     * @param array $with
     *
     * @return null|Entity
     */
    public function findOneBy(array $params, array $with = []): ?object
    {
        return $this->queryWhere($params, $with)->limit(1)->get()->first();
    }
}