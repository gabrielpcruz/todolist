<?php

use App\Http\Site\KanbanController;
use App\Http\Site\Login\Login;
use App\Http\Site\User\UserController;
use App\Middleware\SessionMiddleware;
use Slim\App;

return function (App $app) {

    $app->get('/', [KanbanController::class, 'index'])
        ->add(SessionMiddleware::class);


    $app->get('/login', [Login::class, 'index']);
    $app->post('/login', [Login::class, 'index']);
    $app->get('/signup', [UserController::class, 'index']);
    $app->get('/logout', [Login::class, 'logout']);
};