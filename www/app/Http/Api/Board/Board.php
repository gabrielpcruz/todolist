<?php

namespace App\Http\Api\Board;

use App\Http\Api\AbstractApiController;
use App\Repository\Board\BoardRepository;
use Slim\Psr7\Request;
use Slim\Psr7\Response;

class Board extends AbstractApiController
{
    public function all(Request $request, Response $response): Response
    {
        $repository = new BoardRepository();
        $boards = $repository->all();

        return $this->responseJson($response, $boards->toArray());
    }
}