import { useContext } from "react"
import { FormContext, FormContextProps } from "./FormProvider"

type UseFormResponse<T> = {
    onChange?: (key, value) => void,
    validateForm?: () => void,
    formData: T,
    errors: {
      [Property in keyof T]: boolean | string
    }
  }
  
  function useForms<T>(): UseFormResponse<T> {
    const { formData, errors, onChange, validateForm } = useContext<FormContextProps<T>>(FormContext)
  
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
  