<?php

namespace App\Http\Api\Card;

use App\Entity\Card\CardEntity;
use App\Http\Api\AbstractApiController;
use App\Repository\Card\CardAbstractRepository;
use App\Utils\Session;
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
        $cardRepository = new CardAbstractRepository();
        $card = $cardRepository->create($request->getParsedBody());
        $status = 500;
        $cardResponse = [];

        if ($card instanceof CardEntity) {
            $status = 200;
            $cardResponse = $card->toArray();
        }

        return $this->responseJson($response, $cardResponse, $status);
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
        $status = 500;
        $cardResponse = [];
        $cardRepository = new CardAbstractRepository();
        $parameters = json_decode(json_encode($parameters), true);

        $card = $cardRepository->update($args['id'], $parameters);

        if ($card instanceof CardEntity) {
            $status = 200;
            $cardResponse = $card->toArray();
        }

        return $this->responseJson($response, $cardResponse, $status);
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
        $repository = new CardAbstractRepository();
        $status = $repository->delete($args['id']) ? 200 : 500;

        return $this->responseJson($response, [], $status);
    }
}