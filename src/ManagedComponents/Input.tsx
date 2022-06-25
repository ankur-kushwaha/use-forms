
import { TextField } from '@adobe/react-spectrum';
import { SpectrumTextFieldProps, TextFieldRef } from "@react-types/textfield";
import { ReactElement, useContext, useEffect, useState } from 'react';
import { connect } from '../common/Connect';
import { FormContext } from '../common/FormProvider';


type Max = {
  value: number,
  message: string
}

function maxValidation(value: number, max?: Max) {
  if (max && max.value) {
    if (value && value > max.value) {
      return max.message
    }
  }
}

type Min = {
  value: number,
  message: string
}

function minValidation(value: number, min: Max) {
  if (min && min.value) {
    if (value && value < min.value) {
      return min.message
    }
  }
}

type InputProps<T> = SpectrumTextFieldProps & {
  id: keyof T,
  label: string, value?: string,
  max?: Max,
  min?: Min,
  errorMessage?: string,
  validate?: (value, formData: T) => string
}

type ConnectProps = {
  children: ReactElement
}

// export default connect<SpectrumTextFieldProps>(TextField)

export function Input<T>(props: InputProps<T>) {
  const { id, max, validate, errorMessage, value } = props;

  const { formData, onChange, setFormError, register } = useContext(FormContext);
  const [error, setError] = useState({
    errorMsg: ""
  })

  useEffect(() => {
    console.log('inside register', { id });

    register?.(id, {
      validate: handleOnChange
    })
  }, []);

  function validateRequired(value) {
    if (!value && props.isRequired) {
      return "Required"
    }
  }

  function validateInput(value) {

    console.log('calling handleonchange', id, value);

    let errorMsg = validateRequired(value) || maxValidation(value, max)

    if (!errorMsg && validate) {
      errorMsg = validate(value, formData);
    }

    return {
      isValid: !errorMsg,
      errorMsg: errorMsg
    }
  }

  function handleOnChange(value) {

    const { isValid, errorMsg } = validateInput(value);

    if (!isValid && errorMsg) {
      setError({
        errorMsg
      })
    } else {
      setError({
        errorMsg: ""
      })
    }
    onChange?.(id, value)
  }

  useEffect(() => {
    if (error.errorMsg) {
      setFormError?.(id, true)
    } else {
      setFormError?.(id, false)
    }

  }, [error.errorMsg])

  return (
    <>
      <TextField {...props} validationState={error.errorMsg ? "invalid" : "valid"} errorMessage={error.errorMsg} onChange={handleOnChange} />
    </>
  )
}