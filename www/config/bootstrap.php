<?php

require __DIR__ . '/../vendor/autoload.php';

use App\App;
use App\Utils\Session;

Session::sessionStart();

define('ROOT_PATH', dirname(__DIR__));

$app = App::bootstrap();

// Timezone
date_default_timezone_set('America/Sao_Paulo');

return $app;