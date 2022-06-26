import React, { ReactElement } from "react";

type ConnectPickerProps = {
  onSelectionChange?: (value) => void;
  onChange?: (value) => void;
}

export function connectOnSelection(Component): React.FC<ConnectPickerProps> {
  return function Connect(props: ConnectPickerProps):ReactElement {

    const {onSelectionChange,onChange} = props;

    const handleOnSelectionChange = React.useCallback((value: any) =>{
      onSelectionChange?.(value)
      onChange?.(value)
    },[onChange, onSelectionChange]);
    
    return <Component {...props} onSelectionChange={handleOnSelectionChange} />
  }
}

// export function connectPicker<S>(Component) {
//   return connect<S,SpectrumPickerProps<{}>>(connectOnSelection<S,SpectrumPickerProps<{}>>(Component));
// }

