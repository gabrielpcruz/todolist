<?php

namespace App\Http\Site\Login;

use App\Http\Site\AbstractSiteController;
use App\Utils\Session;
use Psr\Http\Message\ResponseInterface;
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;

class Login extends AbstractSiteController
{
    /**
     * @param Request $request
     * @param Response $response
     * @return ResponseInterface
     * @throws LoaderError
     * @throws RuntimeError
     * @throws SyntaxError
     */
    public function index(Request $request, Response $response): ResponseInterface
    {
        return $this->view($response, 'login/login.twig');
    }

    /**
     * @param Request $request
     * @param Response $response
     * @return ResponseInterface
     */
    public function logout(Request $request, Response $response): ResponseInterface
    {
        Session::sessionDestroy();

        return $response->withStatus(302)->withHeader('Location',  '/login');
    }
}