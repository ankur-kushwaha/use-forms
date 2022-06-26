

import React,{ ReactComponentElement, ReactElement, ReactNode, useContext, useEffect, useState } from "react";
import { connectOnSelection } from "./ConnectPicker";
import { FormContext, FormContextProps } from "./FormProvider";

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
  id: keyof S,
  isRequired?: boolean;
  label: string, value?: string,
  max?: Max,
  min?: Max,
  errorMessage?: string,
  validate?: (value) => string
}


export function connectOnChange<T>(Component):React.FunctionComponent<ConnectBaseProps<T>>{
  
  return (props: ConnectBaseProps<T>)=> {

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

type Connect = (Comp:ReactElement)=>React.FunctionComponent


let connects:Connect[] = []
export function registerConnect(connectOnFn)  {
  console.log('registerConnect');
  connects.push(connectOnFn);
}


export function connect<S,T>(Component,optionalConnects?:Connect[]) {
  if(optionalConnects && optionalConnects.length){
    connects = connects.concat(optionalConnects);
  }
  console.log('Connect called for ',Component,connects.length);
  
  let Comp = Component;
  for(let connectPlugin of connects.reverse()){
    console.log({connectPlugin});
    Comp = connectPlugin(Comp)
  }
  return Comp as React.FunctionComponent<ConnectBaseProps<S> & T>
};

// registerConnect(connectOnSelection)
registerConnect(connectOnChange)
