import React from "react";


export type FormContextProps<S = any> = {
  formData: S,
  errors: {
    [Property in keyof S]: boolean | string
  },
  register?: (id: keyof S, handler) => void
  onChange?: (id: keyof S, value) => void,
  setFormError?: (id: keyof S, value) => void,
  validateForm?: () => void
}

export function FormProvider({ children }) {
  const [formData, setFormData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [formValidations, setFormValidations] = React.useState<FormElement[]>([]);

  const onChange = React.useCallback((key, value) => {
    setFormData(formData => {
      return {
        ...formData,
        [key]: value
      }
    })
  }, [])

  const setFormError = React.useCallback((id, value) => {
    setErrors(errors => {
      return {
        ...errors,
        [id]: value
      }
    })
  }, [])

  const register = React.useCallback((id, { validate }) => {
    setFormValidations((formValidations) => {
      return {
        ...formValidations,
        [id]: validate
      }
    })
  }, [])

  const validateForm = React.useCallback(() => {
    console.log('validating form', formValidations);

    let isValid = true;
    for (let key of Object.keys(formValidations)) {
      let validate = formValidations[key];
      let errorMsg = validate(formData[key]);
      isValid = isValid && !errorMsg;
    }
    return isValid;
  }, [formData, formValidations])

  return (
    <FormContext.Provider value={{ errors, formData, onChange, setFormError, register, validateForm }}>
      {children}
    </FormContext.Provider>
  )
}

let FormContext = React.createContext<FormContextProps>({
  formData: {},
  errors: {}
});

export {
  FormContext
}


type FormElement = {

}

