<?php

use App\Http\ArrozControle;
use Slim\App;

return function (App $app) {
    $app->get('/', [ArrozControle::class, 'index'] );

};