<?php

require dirname(__DIR__) . '/vendor/autoload.php';

use Swoole\WebSocket\Server;

$server = new Server("localhost", 8080);

$server->on('Message', function (Server $server, $frame) {
    foreach ($server->connections as $connection) {
        if ($connection === $frame->fd) {
            continue;
        }

        $server->push($connection, $frame->data);
    }
});

$server->start();