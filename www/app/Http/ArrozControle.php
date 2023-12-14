<?php

namespace App\Http;

use Slim\Psr7\Request;
use Slim\Psr7\Response;

class ArrozControle
{
    public function index(Request $request, Response $response): Response
    {
        $response->getBody()->write('sdasdsad');
        return $response;
    }
}