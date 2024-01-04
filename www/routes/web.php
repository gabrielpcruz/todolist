<?php

use App\Http\Site\KanbanController;
use Slim\App;

return function (App $app) {
    $app->get('/', [KanbanController::class, 'index'] );
};