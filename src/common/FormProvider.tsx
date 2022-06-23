import React, { useContext, useEffect } from "react";


type FormContextProps = {
  formData: any,
  errors: any,
  register?:(id,handler)=>void
  onChange?: (id, value) => void,
  setFormError?: (id, value) => void,
  validateForm?:()=>void
}

let FormContext = React.createContext<FormContextProps>({
  formData: {},
  errors: {}
});

export {
  FormContext
}

type UseFormResponse<T> = {
  onChange?:(key,value)=>void,
  validateForm?:()=>void,
  formData: T,
  errors:{
    [Property in keyof T]:boolean
  }
}

function useForms<T>(): UseFormResponse<T> {
  const { formData, errors,onChange,validateForm } = useContext(FormContext)

  return {
    formData, 
    errors,
    onChange,
    validateForm
  }
}

export {
  useForms
}

type FormElement={
  [key:string]:()=>string|boolean
}


export function FormProvider({ children }) {
  const [formData, setFormData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [formValidations,setFormValidations] = React.useState<FormElement[]>([]);

  function onChange(key, value) {
    setFormData(formData=>{
      return {...formData,
      [key]: value
      }
    })
  }

  function setFormError(id, value) {
    setErrors({
      ...errors,
      [id]: value
    })
  }

  function register(id,{validate}){
    setFormValidations((formValidations)=>{
      return {
        ...formValidations,
        [id]:validate
      }
    })
    
  }

  useEffect(() => {
    console.log('in useeffect');
    
  }, [])

  function validateForm(){
    console.log('validating form');
    
    console.log({formValidations});
    
    for(let key of Object.keys(formValidations)){
      let validate = formValidations[key];

      validate(formData[key]);
    }

  }
  

  return (
    <FormContext.Provider value={{ errors, formData, onChange, setFormError,register,validateForm }}>
      {children}
    </FormContext.Provider>
  )
}
