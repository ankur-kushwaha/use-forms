import React, { ReactElement } from "react";

type ConnectPickerProps = {
  onSelectionChange?: (value) => void;
  onChange?: (value) => void;
}

export function connectOnSelection(Component): React.FC<ConnectPickerProps> {
  return function Connect(props: ConnectPickerProps):ReactElement {

    const {onSelectionChange,onChange} = props;

    const handleOnSelectionChange = (value: any) =>{
      onSelectionChange?.(value)
      onChange?.(value)
    }
    
    return <Component {...props} onSelectionChange={handleOnSelectionChange} />
  }
}

