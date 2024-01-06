<?php

use App\Http\Api\Board\Board;
use App\Http\Api\Card\Card;
use App\Http\Api\Login\Login;
use App\Http\Api\User\User;
use App\Middleware\SessionApiMiddleware;
use Slim\App;
use Slim\Routing\RouteCollectorProxy;

return function (App $app) {
    $app->group('/v1/api', function (RouteCollectorProxy $api) {

        $api->post('/card', [Card::class, 'create'] );
        $api->put('/card/{id}', [Card::class, 'update'] );
        $api->delete('/card/{id}', [Card::class, 'delete'] );


        $api->get('/board', [Board::class, 'all'] );
    })->add(SessionApiMiddleware::class);

    $app->post('/v1/api/user/login', [Login::class, 'login'] );
    $app->post('/v1/api/user/save', [User::class, 'save'] );

};