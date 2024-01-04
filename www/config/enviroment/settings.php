<?php

return [
    'path' => [
        'assets' => 'assets/',
    ],
    'view' => [
        'path' => ROOT_PATH . '/resources/views',
        'templates' => [
            'site' => ROOT_PATH . '/resources/views/site',
            'layout' => ROOT_PATH . '/resources/views/layout',
        ],
        'settings' => [

        ]
    ],
    'database' => [
        'driver' => 'mysql',
        'host' => 'mysql',
        'database' => 'todolist',
        'username' => 'root',
        'password' => 'root',
        'charset' => 'utf8mb4',
        'collation' => 'utf8mb4_0900_ai_ci',
        'prefix' => '',
    ]
];