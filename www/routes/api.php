<?php


use App\Http\Api\Board\Board;
use App\Http\Api\Card\Card;
use Slim\App;

return function (App $app) {

    $app->post('/v1/api/card', [Card::class, 'add'] );
    $app->put('/v1/api/card/{id}', [Card::class, 'update'] );
    $app->delete('/v1/api/card/{id}', [Card::class, 'delete'] );
    $app->get('/v1/api/board', [Board::class, 'all'] );

};