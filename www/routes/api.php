<?php

use App\Http\Api\Board\Board;
use App\Http\Api\Card\Card;
use Slim\App;
use Slim\Routing\RouteCollectorProxy;

return function (App $app) {
    $app->group('/v1/api', function (RouteCollectorProxy $api) {

        $api->post('/card', [Card::class, 'add'] );
        $api->put('/card/{id}', [Card::class, 'update'] );
        $api->delete('/card/{id}', [Card::class, 'delete'] );


        $api->get('/board', [Board::class, 'all'] );
    });
};