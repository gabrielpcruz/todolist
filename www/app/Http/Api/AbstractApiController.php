<?php

namespace App\Http\Api;

use App\Http\Controller;
use Slim\Psr7\Response;

class AbstractApiController extends Controller
{
    /**
     * @param Response $response
     * @param array $json
     * @param int $code
     * @return Response
     */
    protected function responseJson(Response $response, array $json = [], int $code = 200): Response
    {
        $response->getBody()->write(json_encode($json));

        return $response->withStatus($code);
    }
}