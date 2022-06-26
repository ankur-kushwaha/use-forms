

import React,{ ReactNode, useContext, useEffect, useState } from "react";
import { FormContext, FormContextProps } from "./FormProvider";
import { SpectrumTextFieldProps } from '@react-types/textfield';

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

function minValidation(value: number, max?: Max) {
  if (max && max.value) {
    if (value && value < max.value) {
      return max.message
    }
  }
}


function validateRequired(value, isRequired) {
  if (!value && isRequired) {
    return "Required"
  }
}

function validateEmail(value,type,errorMessage){
  if(type === 'email' && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))){
    return errorMessage||'Invalid email'
  }
} 

export type ConnectBaseProps<S>= {
  children?: ReactNode,
  id: keyof S & string,
  isRequired?: boolean;
  label: string, value?: string,
  max?: Max,
  min?: Max,
  errorMessage?: string,
  validate?: (value) => string
}

export function connectOnChange<T>(Component:React.FunctionComponent<SpectrumTextFieldProps>):React.FunctionComponent<ConnectBaseProps<T>>{
  
  return (props:ConnectBaseProps<T>)=> {

    const { id, max,min, validate,isRequired ,errorMessage} = props;

    const {  onChange, setFormError, register } = useContext<FormContextProps>(FormContext);
    const [error, setError] = useState({
      errorMsg: ""
    })

    const validateInput =(value) =>{
      console.log('Validating input', id, value);


      let errorMsg;
      if(validate){
        errorMsg = validate(value);
      }

      if (!errorMsg) {
        errorMsg = validateRequired(value, isRequired) || maxValidation(value, max) || minValidation(value, min)||validateEmail(value,props["type"],errorMessage)
      }

      setError({
        errorMsg: errorMsg || ""
      })
      setFormError?.(id, errorMsg)
      return errorMsg;
    }

    useEffect(() => {
      console.log('registering', { id });

      register?.(id, {
        validate: validateInput
      })

      if(props['defaultValue']){
        onChange?.(id,props['defaultValue'])
      }

    }, [id, register]);


    const handleOnChange =(value) =>{
      validateInput(value);
      onChange?.(id, value)
    }

    return <Component {...props} validationState={error.errorMsg ? "invalid" : "valid"} errorMessage={error.errorMsg} onChange={handleOnChange} />
  }
}

