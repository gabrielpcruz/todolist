<?php


use App\Http\Api\Card\Card;
use Slim\App;

return function (App $app) {

    $app->post('/v1/api/card', [Card::class, 'add'] );

};