<?php

namespace App\Entity;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

abstract class Entity extends Model
{
    use SoftDeletes;

    /**
     * @return integer
     */
    public function getId(): int
    {
        return $this->attributes['id'];
    }
}