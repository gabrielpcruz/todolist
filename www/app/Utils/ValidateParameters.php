<?php

namespace App\Utils;

use App\Error\ParameterInvalidException;
use App\Error\ParameterNotImprovedException;

class ValidateParameters
{
    /**
     * @var array
     */
    protected array $parameters;

    /**
     * @param string $input
     * @param string|null $label
     * @param int $filter
     * @return ValidateParameters
     */
    public function addParameter(
        string $input,
        string $label = null,
        int    $filter = FILTER_FLAG_NONE
    ): static
    {
        $this->parameters[] = [
            'parameter' => $input,
            'label' => $label ?? $input,
            'filter_flag' => $filter,
        ];

        return $this;
    }

    /**
     * @param array $parametersToValidate
     * @return array
     * @throws ParameterNotImprovedException|ParameterInvalidException
     */
    public function validate(array $parametersToValidate): array
    {
        foreach ($this->parameters as $parameter) {
            $parameterName = $parameter['parameter'];
            $parameterFilter = $parameter['filter_flag'];
            $parameterLabel = $parameter['label'];

            if (!array_key_exists($parameterName, $parametersToValidate)) {
                throw new ParameterNotImprovedException("Campo {$parameterName} não foi informado!");
            }

            if (!filter_var($parametersToValidate[$parameterName], $parameterFilter)) {
                throw new ParameterInvalidException("Campo {$parameterLabel} inválido, tente novamente!");
            }
        }

        return $parametersToValidate;
    }
}