<?php

namespace App\Utils;

use App\Entity\User\UserEntity;

class Session
{
    /**
     * @var int
     */
    private static int $SESSION_TIME = 1800;

    public static function sessionStart(): void
    {
        if (!self::sessionIsActive()) {
            session_start();
        }

        Session::sessionTimeMonitor();
    }

    /**
     * @return void
     */
    private static function sessionTimeMonitor(): void
    {
        if (
            isset($_SESSION['last_activity']) &&
            (time() - $_SESSION['last_activity'] > self::$SESSION_TIME)
        ) {
            Session::sessionDestroy();
        }

        $_SESSION['last_activity'] = time();
    }

    /**
     * @param UserEntity $userEntity
     * @return void
     */
    public static function setUser(UserEntity $userEntity): void
    {
        self::sessionStart();

        Session::add('user_id', $userEntity->getId());
        Session::add('user_data', $userEntity);
    }

    /**
     * @return UserEntity|null
     */
    public static function getUser(): ?UserEntity
    {
        self::sessionStart();

        return Session::get('user_data');
    }

    /**
     * @param $index
     * @param $value
     * @return void
     */
    public static function add($index, $value): void
    {
        $_SESSION[$index] = $value;
    }

    /**
     * @param $key
     * @return mixed|null
     */
    public static function get($key): mixed
    {
        if (isset($_SESSION[$key]) && $_SESSION[$key]) {
            return $_SESSION[$key];
        }

        return null;
    }

    /**
     * @return bool
     */
    public static function isLoggedIn(): bool
    {
        if (empty($_SESSION)) {
            return false;
        }

        return Session::sessionIsActive() &&
            count($_SESSION) &&
            isset($_SESSION['user_id']) && $_SESSION['user_id'] &&
            isset($_SESSION['user_data']) && $_SESSION['user_data'];
    }

    /**
     * @return void
     */
    public static function sessionDestroy(): void
    {
        session_unset();
        session_destroy();

        $_SESSION = [];
    }

    /**
     * @return bool
     */
    public static function sessionIsInactive(): bool
    {
        return !Session::sessionIsActive();
    }

    /**
     * @return bool
     */
    public static function sessionIsActive(): bool
    {
        return session_status() === PHP_SESSION_ACTIVE;
    }
}