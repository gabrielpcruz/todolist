<?php

namespace App\Http;

use stdClass;

abstract class Controller
{
    /**
     * @return stdClass
     */
    protected function getParameters(): stdClass
    {
        $body = new stdClass();

        $parameters = urldecode(file_get_contents('php://input'));

        if (empty($parameters)) {
            return $body;
        }

        foreach (explode("&", $parameters) as $value) {
            $keyValue = explode("=", $value);

            $key = $keyValue[0];
            $value = $keyValue[1];

            $body->{$key} = filter_var($value);
        }

        return $body;
    }
}