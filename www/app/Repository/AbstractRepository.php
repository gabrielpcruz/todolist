<?php

namespace App\Repository;

use App\App;
use App\Entity\Entity;
use DI\DependencyException;
use DI\NotFoundException;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\ConnectionInterface;

abstract class AbstractRepository
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

    /**
     * @param int $id
     * @return bool|null
     */
    public function delete(int $id): ?bool
    {
        return $this->findOneBy(['id' => $id])->delete();
    }

    /**
     * @return ConnectionInterface
     * @throws DependencyException
     * @throws NotFoundException
     * @throws Exception
     */
    public function connection() : ConnectionInterface
    {
        return App::container()->get(ConnectionInterface::class);
    }
}