<?php

use App\Http\Site\ArrozControle;
use Slim\App;

return function (App $app) {
    $app->get('/', [ArrozControle::class, 'index'] );

};