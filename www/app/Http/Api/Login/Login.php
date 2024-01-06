<?php

namespace App\Http\Api\Login;

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
     */
    public function login(Request $request, Response $response): Response
    {
        Session::sessionDestroy();

        $body = $this->getParameters();

        $email = $body->email;
        $password = $body->password;

        if (!$email || !$password) {
            return $this->responseJson($response, [
                'result' => 'error',
                'message' => 'Usuário ou senha inválidos'
            ], 500);
        }

        $authService = new Auth();
        $autheticated = $authService->authenticate($email, $password);

        if (!$autheticated) {
            return $this->responseJson($response, [
                'result' => 'error',
                'message' => 'Usuário ou senha inválidos'
            ], 500);
        }

        return $this->responseJson($response, []);
    }
}