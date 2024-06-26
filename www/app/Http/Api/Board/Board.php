<?php

namespace App\Http\Api\Board;

use App\Http\Api\AbstractApiController;
use App\Repository\Board\BoardAbstractRepository;
use Slim\Psr7\Request;
use Slim\Psr7\Response;

class Board extends AbstractApiController
{
    /**
     * @param Request $request
     * @param Response $response
     * @return Response
     */
    public function all(Request $request, Response $response): Response
    {
        $repository = new BoardAbstractRepository();
        $boards = $repository->all();

        return $this->responseJson($response, $boards->toArray());
    }
}