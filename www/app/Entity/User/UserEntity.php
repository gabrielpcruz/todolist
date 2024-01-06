<?php

namespace App\Entity\User;


use App\Entity\Entity;

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

    /**
     * @return string
     */
    public function getPassword(): string
    {
        return $this->attributes['password'];
    }
}