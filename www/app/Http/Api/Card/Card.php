<?php

namespace App\Http\Api\Card;

use App\Http\Api\AbstractApiController;
use App\Repository\Card\CardRepository;
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
    public function create(Request $request, Response $response): Response
    {
        $cardRepository = new CardRepository();
        $card = $cardRepository->create($request->getParsedBody());

        return $this->responseJson($response,  $card->toArray());
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
        $cardRepository = new CardRepository();
        $card = $cardRepository->update($args['id'], $this->getParametersArray());

        return $this->responseJson($response, $card->toArray());
    }

    /**
     * @param Request $request
     * @param Response $response
     * @param array $args
     * @return Response
     * @throws Throwable
     */
    public function delete(Request $request, Response $response, array $args): Response
    {
        $repository = new CardRepository();
        $repository->delete($args['id']);

        return $this->responseJson($response);
    }
}