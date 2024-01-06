<?php

namespace App\Http\Api\User;

use App\Entity\User\UserEntity;
use App\Http\Api\AbstractApiController;
use App\Repository\User\UserRepository;
use DI\DependencyException;
use DI\NotFoundException;
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use Throwable;

class User extends AbstractApiController
{
    /**
     * @param Request $request
     * @param Response $response
     * @return Response
     * @throws DependencyException
     * @throws NotFoundException
     * @throws Throwable
     */
    public function save(Request $request, Response $response): Response
    {
        $body = $this->getParameters();

        if (!$body->name || !$body->email || !$body->password) {
            return $this->responseJson($response, [
                'result' => 'error',
                'message' => 'Invalid name'
            ], 500);
        }

        $userRepository = new UserRepository();
        $userRepository->create($request->getParsedBody());

        return $this->responseJson($response, [
            'result' => 'success',
        ]);
    }
}