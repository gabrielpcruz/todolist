<?php

namespace App\Entity\User;


use App\Entity\Card\CardEntity;
use App\Entity\Entity;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UserEntity extends Entity
{
    /**
     * @var string
     */
    protected $table = 'user';

    /**
     * @var string[]
     */
    protected $fillable = [
        'name',
        'email',
        'password'
    ];

    protected $visible = [
        'name'
    ];

    /**
     * @return string
     */
    public function getPassword(): string
    {
        return $this->attributes['password'];
    }

    /**
     * @return HasMany
     */
    public function card(): HasMany
    {
        return $this->hasMany(
            CardEntity::class,
            'user_id',
            'id'
        );
    }
}