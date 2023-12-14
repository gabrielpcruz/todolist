<?php

namespace App;

use DI\Container;
use DI\DependencyException;
use DI\NotFoundException;
use Exception;
use Slim\App as SlimApp;
use Twig\Error\Error;


class App
{
    private static Container $container;

    /**
     * @var SlimApp
     */
    private static SlimApp $app;

    /**
     * @throws DependencyException
     * @throws NotFoundException
     */
    public static function bootstrap(): SlimApp
    {
        $app = self::getInstace();

        $app->addErrorMiddleware(true, true, true);

        return $app;
    }

    /**
     * @return Container
     * @throws Exception
     */
    private static function getContainer(): Container
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
            self::$app = self::getContainer()->get(SlimApp::class);
        }

        return self::$app;
    }
}