<?php


require dirname(__DIR__) . '/vendor/autoload.php';


$server = new OpenSwoole\WebSocket\Server("localhost", 8080);

$server->set(["open_websocket_ping_frame" => true]);

$server->on('Open', function (OpenSwoole\WebSocket\Server $server, $request) {
    // ...
});

$server->on('Message', function (OpenSwoole\WebSocket\Server $server, $frame) {

    echo "Message received: {$frame->data}\n";


    foreach ($server->connections as $connection) {
        if ($connection === $frame->fd) {
            continue;
        }

        $server->push($connection, $frame->data);
    }


});

$server->on('Close', function ($server, $fd) {
    // ...
});

$server->start();