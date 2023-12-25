<?php

namespace App\Entity\Board;

use App\Entity\Card\CardEntity;
use App\Entity\Entity;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BoardEntity extends Entity
{
    /**
     * @var string
     */
    protected $table  = 'board';

    /**
     * @var string[]
     */
    protected $visible = [
        'id',
        'name',
        'cards'
    ];

    /**
     * @return HasMany
     */
    public function cards() : HasMany
    {
        return $this->hasMany(CardEntity::class, 'board_id', 'id');
    }
}