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
     * @var string
     */
    protected string $name;

    /**
     * @var string
     */
    protected string $email;

    /**
     * @var string
     */
    protected string $password;

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
    public function setName(string $name): UserEntity
    {
        $this->name = $name;
        $this->setAttribute('name', $name);

        return $this;
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        $this->email = $this->getAttribute('email');
        return $this->email;
    }

    /**
     * @param string $email
     * @return $this
     */
    public function setEmail(string $email): UserEntity
    {
        $this->email = $email;
        $this->setAttribute('email', $email);

        return $this;
    }

    /**
     * @return string
     */
    public function getPassword(): string
    {
        $this->password = $this->getAttribute('password');
        return $this->password;
    }

    /**
     * @param string $password
     * @return $this
     */
    public function setPassword(string $password): UserEntity
    {
        $this->password = $password;
        $this->setAttribute('password', $password);

        return $this;
    }
}