<?php

namespace App\Entity\Card;

use App\Entity\Board\BoardEntity;
use App\Entity\Entity;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CardEntity extends Entity
{
    /**
     * @var string
     */
    protected $table = 'card';

    /**
     * @var array
     */
    protected $fillable = [
        'description',
        'position',
        'board_id'
    ];

    protected $visible = [
        'id',
        'description',
        'position',
        'board_id'
    ];

    /**
     * @return HasOne
     */
    public function board() : HasOne
    {
        return $this->hasOne(BoardEntity::class, 'id', 'board_id');
    }
}