<?php

use App\Http\Site\Kanban\Kanban;
use App\Http\Site\Login\Login;
use App\Http\Site\User\User;
use App\Middleware\SessionMiddleware;
use Slim\App;

return function (App $app) {

    $app->get('/', [Kanban::class, 'index'])->add(SessionMiddleware::class);

    $app->get('/login', [Login::class, 'index']);
    $app->post('/login', [Login::class, 'index']);
    $app->get('/signup', [User::class, 'index']);
    $app->get('/logout', [Login::class, 'logout']);
};