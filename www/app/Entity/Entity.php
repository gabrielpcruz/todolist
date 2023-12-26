<?php

namespace App\Entity;

use Illuminate\Database\Eloquent\Model;

abstract class Entity extends Model
{
    /**
     * @return integer
     */
    public function getId(): int
    {
        return $this->attributes['id'];
    }
}