<?php

namespace App\Http\Api\User;

use App\Http\Api\AbstractApiController;
use App\Repository\User\UserRepository;
use DI\DependencyException;
use DI\NotFoundException;
use DomainException;
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
        $parameters = $this->getValidation()
            ->addParameter('name', 'nome', FILTER_DEFAULT)
            ->addParameter('email', 'e-mail', FILTER_VALIDATE_EMAIL)
            ->addParameter('password', 'senha', FILTER_DEFAULT)
            ->validate($this->getParametersArray());

        $userRepository = new UserRepository();
        $userRepository->create($parameters);

        return $this->responseJson($response, [
            'result' => 'success',
        ]);
    }
}