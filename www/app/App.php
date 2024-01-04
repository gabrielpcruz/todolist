<?php

namespace App;

use Adbar\Dot;
use DI\Container;
use DI\DependencyException;
use DI\NotFoundException;
use Exception;
use Illuminate\Database\Capsule\Manager;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Slim\App as SlimApp;

class App
{
    private static Container $container;

    /**
     * @var SlimApp
     */
    private static SlimApp $app;

    /**
     * @return SlimApp
     * @throws ContainerExceptionInterface
     * @throws DependencyException
     * @throws NotFoundException
     * @throws NotFoundExceptionInterface
     */
    public static function bootstrap(): SlimApp
    {
        $app = self::getInstace();

        self::setupDatabase();

        $app->addErrorMiddleware(true, true, true);

        return $app;
    }

    /**
     * @return Container
     * @throws Exception
     */
    public static function container(): Container
    {
        if (!isset(self::$container)) {
            self::$container = (new ContainerBuilder())->build();
        }

        return self::$container;
    }

    /**
     * @throws DependencyException
     * @throws NotFoundException
     * @throws Exception
     */
    public static function getInstace()
    {
        if (!isset(self::$app)) {
            self::$app = self::container()->get(SlimApp::class);
        }

        return self::$app;
    }

    /**
     * @return Dot
     * @throws DependencyException
     * @throws NotFoundException
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    public static function settings(): Dot
    {
        return self::getInstace()->getContainer()->get('settings');
    }

    /**
     * @return string
     */
    public static function version(): string
    {
        return uniqid();
    }

    /**
     * @return void
     * @throws ContainerExceptionInterface
     * @throws DependencyException
     * @throws NotFoundException
     * @throws NotFoundExceptionInterface
     */
    private static function setupDatabase(): void
    {
        $manager = new Manager();

        $connection = self::settings()->get('database');

        $manager->addConnection($connection);

        $manager->setAsGlobal();
        $manager->bootEloquent();
    }
}