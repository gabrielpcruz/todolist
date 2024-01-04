<?php

namespace App\Http\Api\Card;

use App\Entity\Card\CardEntity;
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
    public function add(Request $request, Response $response): Response
    {
        $cardRepository = new CardRepository();
        $card = $cardRepository->create($request->getParsedBody());

        $status = ($card instanceof CardEntity) ? 200 : 500;

        return $this->responseJson($response, [
            'cardId' => $card->getId()
        ], $status);
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
        $parameters = $this->getParameters();

        $cardRepository = new CardRepository();
        $parameters = json_decode(json_encode($parameters), true);

        $status = $cardRepository->update($args['id'], $parameters) ? 200 : 500;

        return $this->responseJson($response, [], $status);
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
        $status = $repository->delete($args['id']) ? 200 : 500;

        return $this->responseJson($response, [], $status);
    }
}