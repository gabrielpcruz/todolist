<?php

namespace App\Entity\Card;

use App\Entity\Board\BoardEntity;
use App\Entity\Entity;
use App\Entity\User\UserEntity;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CardEntity extends Entity
{
    /**
     * @var string
     */
    protected $table = 'card';

    /**
     * @var int
     */
    protected int $id;

    /**
     * @var string
     */
    protected string $description;

    /**
     * @var int
     */
    protected int $position;

    /**
     * @var int
     */
    protected int $board_id;

    /**
     * @var int|null
     */
    protected ?int $user_id;

    /**
     * @var UserEntity|null
     */
    protected ?UserEntity $user;

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
     * @return string
     */
    public function getDescription(): string
    {
        $this->description = $this->getAttribute('description');
        return $this->description;
    }

    /**
     * @param string $description
     * @return $this
     */
    public function setDescription(string $description): CardEntity
    {
        $this->description = $description;
        $this->setAttribute('description', $description);

        return $this;
    }

    /**
     * @return int
     */
    public function getPosition(): int
    {
        $this->position = $this->getAttribute('position');
        return $this->position;
    }

    /**
     * @param int $position
     * @return $this
     */
    public function setPosition(int $position): CardEntity
    {
        $this->position = $position;
        $this->setAttribute('position', $position);

        return $this;
    }

    /**
     * @return int
     */
    public function getBoardId(): int
    {
        $this->board_id = $this->getAttribute('board_id');
        return $this->board_id;
    }

    /**
     * @param int $board_id
     * @return $this
     */
    public function setBoardId(int $board_id): CardEntity
    {
        $this->board_id = $board_id;
        $this->setAttribute('board_id', $board_id);

        return $this;
    }

    /**
     * @return int|null
     */
    public function getUserId(): ?int
    {
        $this->user_id = $this->getAttribute('user_id');
        return $this->user_id;
    }

    /**
     * @param int|null $user_id
     * @return $this
     */
    public function setUserId(?int $user_id): CardEntity
    {
        $this->user_id = $user_id;
        $this->setAttribute('user_id', $user_id);

        return $this;
    }

    /**
     * @return UserEntity|null
     */
    public function getUser(): ?UserEntity
    {
        $this->user = $this->getAttribute('user');

        return $this->user;
    }

    /**
     * @param UserEntity|null $user
     * @return $this
     */
    public function setUser(?UserEntity $user): CardEntity
    {
        $this->user = $user;
        return $this;
    }

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

    /**
     * @return array
     */
    public function toArray(): array
    {
        return [
            'id' => $this->getId(),
            'user_id' => $this->getUserId(),
            'user_name' => $this->getUser()?->getName(),
            'description' => $this->getDescription(),
            'position' => $this->getPosition(),
            'board_id' => $this->getBoardId(),
        ];
    }
}