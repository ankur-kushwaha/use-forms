import { useContext } from "react";
import { connect, ConnectProps } from "./Connect";
import { FormContext } from "./FormProvider";
import { SpectrumPickerProps } from "@react-types/select";

type ConnectPickerProps<S, T> = ConnectProps<S, T> & {
  onSelectionChange?: (value) => void;
  onChange?: (value) => void;
}

export function connectOnSelection<S, T>(Component) {
  return function Connect(props: ConnectPickerProps<S, T>) {
    function handleOnSelectionChange(value) {
      props.onSelectionChange?.(value)
      props.onChange?.(value)
    }
    
    return <Component {...props} onSelectionChange={handleOnSelectionChange} />
  }
}

export function connectPicker<S>(Component) {
  return connect<S,SpectrumPickerProps<{}>>(connectOnSelection<S,SpectrumPickerProps<{}>>(Component));
}

