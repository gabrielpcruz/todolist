<?php

namespace App\Http\Site\User;

use App\Http\Site\AbstractSiteController;
use Psr\Http\Message\ResponseInterface;
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;

class UserController extends AbstractSiteController
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
        return $this->view($response, 'signup/index.twig');
    }
}