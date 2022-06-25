import { Item, Item as RSItem, Picker } from '@adobe/react-spectrum'
import React, { ReactNode, useContext } from 'react'
import { SpectrumPickerProps } from "@react-types/select";
import { FormContext } from '../common/FormProvider';

type ManagedPickerProps<T> = SpectrumPickerProps<any> & {
  id:keyof T,
  items:any,
  children?:ReactNode
}

export default function ManagedPicker<T>(props:ManagedPickerProps<T>) {
  const { children, ...otherProps } = props
  const {onChange} = useContext(FormContext)

  const handleOnSelectionChange = React.useCallback((value)=>{
    onChange?.(props.id,value)
    props.onSelectionChange?.(value)
  },[])

  return (
    <Picker {...otherProps} onSelectionChange={handleOnSelectionChange}>
      {props.items?.map?.(item=><Item key={item.value}>{item.text}</Item>)}
    </Picker>
  )
}
