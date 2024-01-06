<?php

namespace App\Http\Api\Login;

use App\Entity\User\UserEntity;
use App\Error\AuthenticationException;
use App\Error\ParameterInvalidException;
use App\Error\ParameterNotImprovedException;
use App\Http\Api\AbstractApiController;
use App\Service\Auth;
use App\Utils\Session;
use Slim\Psr7\Request;
use Slim\Psr7\Response;

class Login extends AbstractApiController
{
    /**
     * @param Request $request
     * @param Response $response
     * @return Response
     * @throws AuthenticationException
     * @throws ParameterInvalidException
     * @throws ParameterNotImprovedException
     */
    public function login(Request $request, Response $response): Response
    {
        Session::sessionDestroy();

        $parameters = $this->getValidation()
            ->addParameter('email', 'e-mail',  FILTER_VALIDATE_EMAIL)
            ->addParameter('password', 'senha' , FILTER_DEFAULT)
            ->validate($this->getParametersArray());

        $authService = new Auth();
        $authService->authenticate(new UserEntity($parameters));

        return $this->responseJson($response);
    }
}