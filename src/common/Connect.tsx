

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

function validateRequired(value, isRequired) {
  if (!value && isRequired) {
    return "Required"
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

type Connect = (Component: React.FunctionComponent<any>) => React.FunctionComponent<any>

export function connectOnChange<T>(Component:React.FunctionComponent<SpectrumTextFieldProps>):React.FunctionComponent<ConnectBaseProps<T>>{
  
  return (props:ConnectBaseProps<T>)=> {

    const { id, max, validate,isRequired } = props;

    const {  onChange, setFormError, register } = useContext<FormContextProps>(FormContext);
    const [error, setError] = useState({
      errorMsg: ""
    })

    const validateInput = React.useCallback((value) =>{
      console.log('Validating input', id, value);

      let errorMsg = validateRequired(value, isRequired) || maxValidation(value, max)

      if (!errorMsg && validate) {
        errorMsg = validate(value);
      }

      setError({
        errorMsg: errorMsg || ""
      })
      setFormError?.(id, errorMsg)
      return errorMsg;
    },[id, isRequired, max, setFormError, validate])

    useEffect(() => {
      console.log('registering', { id });

      register?.(id, {
        validate: validateInput
      })
    }, [id, register]);


    const handleOnChange = React.useCallback((value) =>{
      validateInput(value);
      onChange?.(id, value)
    },[id, onChange, validateInput])

    return <Component {...props} validationState={error.errorMsg ? "invalid" : "valid"} errorMessage={error.errorMsg} onChange={handleOnChange} />
  }
}

export function connect<S,T>(Component,optionalConnects?:Connect[]) {
  let connects:Connect[] = [];

  //register default 
  connects.push(connectOnChange);

  if(optionalConnects && optionalConnects.length){
    connects = connects.concat(optionalConnects);
  }

  console.log('connected plugins',connects);
  
  let Comp = Component;
  for(let connectPlugin of connects.reverse()){
    Comp = connectPlugin(Comp)
  }
  return Comp as React.FunctionComponent<ConnectBaseProps<S> & T>
};
