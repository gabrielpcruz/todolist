<?php

namespace App\Http\Api\Card;

use App\Http\Api\AbstractApiController;
use JetBrains\PhpStorm\NoReturn;
use Slim\Psr7\Request;
use Slim\Psr7\Response;

class Card extends AbstractApiController
{
    /**
     * @param Request $request
     * @param Response $response
     * @return Response
     */
    public function add(Request $request, Response $response): Response
    {
//        var_dump($this->getParameters());


        return $this->responseJson($response, [], 500);
    }
}