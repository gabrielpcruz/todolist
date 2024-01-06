<?php

namespace App\Entity\Board;

use App\Entity\Card\CardEntity;
use App\Entity\Entity;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

class BoardEntity extends Entity
{
    /**
     * @var string
     */
    protected $table  = 'board';

    /**
     * @var int
     */
    protected int $id;

    /**
     * @var string
     */
    protected string $name;

    /**
     * @var Collection|null
     */
    protected ?Collection $cards;

    /**
     * @var string[]
     */
    protected $visible = [
        'id',
        'name',
        'cards'
    ];

    /**
     * @return string
     */
    public function getName(): string
    {
        $this->name = $this->getAttribute('name');

        return $this->name;
    }

    /**
     * @param string $name
     * @return $this
     */
    public function setName(string $name): BoardEntity
    {
        $this->name = $name;
        $this->setAttribute('name', $name);

        return $this;
    }

    /**
     * @return Collection|null
     */
    public function getCards(): ?Collection
    {
        $this->cards = $this->getAttribute('cards');

        return $this->cards;
    }

    /**
     * @param Collection|null $cards
     * @return $this
     */
    public function setCards(?Collection $cards): BoardEntity
    {
        $this->cards = $cards;
        $this->setAttribute('cards', $cards);

        return $this;
    }

    /**
     * @return HasMany
     */
    public function cards() : HasMany
    {
        return $this
            ->hasMany(CardEntity::class, 'board_id', 'id')
            ->orderBy('card.position', 'ASC')
            ->orderBy('card.updated_at', 'DESC');
    }
}