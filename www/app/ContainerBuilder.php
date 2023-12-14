<?php

namespace app;

use DI\Container;
use DI\ContainerBuilder as ContainerBuilderDI;
use Exception;

final class ContainerBuilder
{
    /**
     * @return Container
     * @throws Exception
     */
    public function build(): Container
    {
        return (new ContainerBuilderDI())
            ->addDefinitions(__DIR__ . '/../config/container.php')
            ->build();
    }
}