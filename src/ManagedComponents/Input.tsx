
import { TextField } from '@adobe/react-spectrum';
import { SpectrumTextFieldProps, TextFieldRef } from "@react-types/textfield";
import { useContext, useEffect, useState } from 'react';
import { FormContext } from '../common/FormProvider';

type InputProps<T> = SpectrumTextFieldProps & {
  id: keyof T,
  label: string, value?: string,
  max?: {
    value:number,
    msg:string
  },
  errorMessage?: string,
  validate?: (value, formData: T) => string
}

export function Input<T>(props: InputProps<T>) {
  const { id, max, validate, errorMessage } = props;
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

  function validateRequired(value){
    if(!value){
      return "Required"
    }
  }

  function validateMaxValue(value){
    if(max && max.value){
      if(value>max.value){
        return max.msg
      }
    }
    return "";
  }

  function doValidate(value) {
    
    console.log('calling handleonchange', id, value);

    let errorMsg = validateRequired(value) || validateMaxValue(value)

    if (!errorMsg && validate) {
      errorMsg = validate(value, formData);
    }

    return {
      isValid:!errorMsg,
      errorMsg:errorMsg
    }
  }

  function handleOnChange(value) {

    const { isValid, errorMsg } = doValidate(value);

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