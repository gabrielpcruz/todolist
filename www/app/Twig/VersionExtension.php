<?php

namespace App\Twig;

use App\App;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class VersionExtension extends AbstractExtension
{
    /**
     * @return string
     */
    public function getName(): string
    {
        return 'version';
    }

    /**
     * @return TwigFunction[]
     */
    public function getFunctions(): array
    {
        return [
            new TwigFunction('version', [$this, 'version']),
        ];
    }

    /**
     * @return string
     */
    public function version(): string
    {
        return App::version();
    }
}
