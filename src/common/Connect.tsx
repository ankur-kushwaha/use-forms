import { ReactNode, useContext, useEffect, useState } from "react";
import { connectOnSelection } from "./ConnectPicker";
import { FormContext } from "./FormProvider";


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

function validateRequired(value, props) {
  if (!value && props.isRequired) {
    return "Required"
  }
}

export type ConnectProps<S, T> = T & {
  children?: ReactNode,
  id: keyof S,
  isRequired?: boolean;
  label: string, value?: string,
  max?: Max,
  min?: Max,
  errorMessage?: string,
  validate?: (value, formData: S) => string
}

export function connectOnChange<S, T>(Component) {
  return function Connect(props: ConnectProps<S, T>) {

    const { id, max, validate } = props;

    const { formData, onChange, setFormError, register } = useContext(FormContext);
    const [error, setError] = useState({
      errorMsg: ""
    })

    useEffect(() => {
      console.log('registering', { id });

      register?.(id, {
        validate: handleOnChange
      })
    }, []);

    function validateInput(value) {
      console.log('Validating input', id, value);

      let errorMsg = validateRequired(value, props) || maxValidation(value, max)

      if (!errorMsg && validate) {
        errorMsg = validate(value, formData);
      }

      setError({
        errorMsg: errorMsg || ""
      })
      setFormError?.(id, errorMsg)
    }

    function handleOnChange(value) {
      validateInput(value);
      onChange?.(id, value)
    }

    return <Component {...props} validationState={error.errorMsg ? "invalid" : "valid"} errorMessage={error.errorMsg} onChange={handleOnChange} />
  }
}

export function connect<S, T>(Component) {
  return connectOnChange<S, T>(Component);
}
