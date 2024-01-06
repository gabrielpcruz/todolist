<?php

namespace App\Entity\Card;

use App\Entity\Board\BoardEntity;
use App\Entity\Entity;
use App\Entity\User\UserEntity;
use Illuminate\Database\Eloquent\Relations\HasMany;
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
        'board_id',
        'user_id'
    ];

    protected $visible = [
        'id',
        'description',
        'position',
        'board_id',
        'user_id'
    ];

    /**
     * @return HasOne
     */
    public function board() : HasOne
    {
        return $this->hasOne(
            BoardEntity::class,
            'id',
            'board_id'
        );
    }

    /**
     * @return HasOne
     */
    public function user() : HasOne
    {
        return $this->hasOne(
            UserEntity::class,
            'id',
            'user_id'
        );
    }

    public function toArray()
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'user_name' => $this->user?->name,
            'description' => $this->description,
            'position' => $this->position,
            'board_id' => $this->board_id,
        ];
    }
}