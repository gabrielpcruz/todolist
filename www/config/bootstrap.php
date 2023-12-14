<?php

require __DIR__ . '/../vendor/autoload.php';

use App\App;

var_dump(1);


$app = App::bootstrap();


// Timezone
date_default_timezone_set('America/Sao_Paulo');

return $app;