<?php

namespace App\Http\Site\Kanban;

use App\Http\Site\AbstractSiteController;
use Psr\Http\Message\ResponseInterface;
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;

class Kanban extends AbstractSiteController
{
    /**
     * @throws SyntaxError
     * @throws RuntimeError
     * @throws LoaderError
     */
    public function index(Request $request, Response $response): ResponseInterface
    {
        return $this->view($response, 'kanban/index.twig');
    }
}