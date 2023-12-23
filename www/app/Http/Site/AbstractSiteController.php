<?php

namespace App\Http\Site;

use App\Http\Controller;
use Psr\Http\Message\ResponseInterface;
use Slim\Views\Twig;
use Slim\Psr7\Response;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;

abstract class AbstractSiteController extends Controller
{
    /**
     * @var Twig
     */
    protected Twig $twig;

    /**
     * @param Twig $twig
     */
    public function __construct(Twig $twig)
    {
        $this->twig = $twig;
    }

    /**
     * @param Response $response
     * @param string $template
     * @param array $arguments
     * @return ResponseInterface
     * @throws LoaderError
     * @throws RuntimeError
     * @throws SyntaxError
     */
    protected function view(
        Response $response,
        string $template,
        array $arguments = []
    ) : ResponseInterface
    {
        return $this->twig->render($response, "@site/$template", $arguments);
    }
}