import { FormControl, Input } from '@chakra-ui/react';
import React from 'react';
import type { ControllerRenderProps } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

import type { FormFields } from '../types';

import CheckboxInput from 'ui/shared/CheckboxInput';
import InputPlaceholder from 'ui/shared/InputPlaceholder';

import ContractVerificationFormRow from '../ContractVerificationFormRow';

const ContractVerificationFieldOptimization = () => {
  const [ isEnabled, setIsEnabled ] = React.useState(true);
  const { formState, control } = useFormContext<FormFields>();

  const handleCheckboxChange = React.useCallback(() => {
    setIsEnabled(prev => !prev);
  }, []);

  const renderCheckboxControl = React.useCallback(({ field }: {field: ControllerRenderProps<FormFields, 'is_optimization_enabled'>}) => (
    <CheckboxInput<FormFields, 'is_optimization_enabled'>
      text="Optimization enabled"
      field={ field }
      onChange={ handleCheckboxChange }
      isDisabled={ formState.isSubmitting }
    />
  ), [ formState.isSubmitting, handleCheckboxChange ]);

  const renderInputControl = React.useCallback(({ field }: {field: ControllerRenderProps<FormFields, 'optimization_runs'>}) => {
    return (
      <FormControl variant="floating" id={ field.name } size={{ base: 'md', lg: 'lg' }} isRequired>
        <Input
          { ...field }
          required
          isDisabled={ formState.isSubmitting }
          autoComplete="off"
          type="number"
        />
        <InputPlaceholder text="Optimization runs"/>
      </FormControl>
    );
  }, [ formState.isSubmitting ]);

  return (
    <>
      <ContractVerificationFormRow>
        <Controller
          name="is_optimization_enabled"
          control={ control }
          render={ renderCheckboxControl }
          defaultValue={ true }
        />
      </ContractVerificationFormRow>
      { isEnabled && (
        <ContractVerificationFormRow>
          <Controller
            name="optimization_runs"
            control={ control }
            render={ renderInputControl }
            rules={{ required: true }}
            defaultValue="200"
          />
        </ContractVerificationFormRow>
      ) }
    </>
  );
};

export default React.memo(ContractVerificationFieldOptimization);