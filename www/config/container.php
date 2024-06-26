<?php

use Adbar\Dot;
use App\Twig\AssetsExtension;
use App\Twig\VersionExtension;
use Illuminate\Database\Capsule\Manager;
use Psr\Container\ContainerInterface;
use Slim\App;
use Slim\Factory\AppFactory;
use Slim\Views\Twig;
use Twig\Extension\DebugExtension;
use Twig\Loader\FilesystemLoader;

return [
    'settings' => function () {
        $enviromentSettings = [];

        $settings = (require_once __DIR__ . '/enviroment/settings.php');

        $settings = array_replace_recursive($settings, $enviromentSettings);

        return new Dot($settings);
    },

    App::class => function (ContainerInterface $container) {
        $app = AppFactory::createFromContainer($container);

        // Adding routes of application
        (require __DIR__ . '/../routes/web.php')($app);
        (require __DIR__ . '/../routes/api.php')($app);

        $app->addRoutingMiddleware();

        return $app;
    },

    Twig::class => function (ContainerInterface $container) {
        $settings = $container->get('settings');

        $rootPath = $settings->get('view.path');

        $templates = $settings->get('view.templates');
        $viewSettings = $settings->get('view.settings');

        $loader = new FilesystemLoader([], $rootPath);

        foreach ($templates as $namespace => $template) {
            $loader->addPath($template, $namespace);
        }

        $twig = new Twig($loader, $viewSettings);
        $twig->addExtension(new DebugExtension());
        $twig->addExtension(new AssetsExtension());
        $twig->addExtension(new VersionExtension());


        return $twig;
    },

    Illuminate\Database\ConnectionInterface::class => function (ContainerInterface $container) {
        return Manager::connection('default');
    },
];
