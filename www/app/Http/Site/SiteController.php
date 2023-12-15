<?php

namespace App\Http\Site;

use App\Http\Controller;
use Slim\Views\Twig;

abstract class SiteController extends Controller
{
    protected Twig $twig;

    public function __construct(Twig $twig)
    {
        $this->twig = $twig;
    }
}