<?php

namespace App\Http\Api\Card;

use App\Entity\Card\CardEntity;
use App\Http\Api\AbstractApiController;
use App\Repository\Card\CardRepository;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use Throwable;

class Card extends AbstractApiController
{
    /**
     * @param Request $request
     * @param Response $response
     * @return Response
     * @throws Throwable
     */
    public function add(Request $request, Response $response): Response
    {
        $card = new CardEntity();
        $card->fill($request->getParsedBody());
        $status = $card->saveOrFail() ? 200 : 500;

        return $this->responseJson($response, [], $status);
    }

    /**
     * @param Request $request
     * @param Response $response
     * @param array $args
     * @return Response
     * @throws Throwable
     */
    public function update(Request $request, Response $response, array $args): Response
    {
        $cardEntity = new CardEntity();
        $status = $cardEntity->updateOrFail($args) ? 200 : 500;

        return $this->responseJson($response, [], $status);
    }
}