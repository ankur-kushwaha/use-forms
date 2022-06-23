import { Item, Item as RSItem, Picker } from '@adobe/react-spectrum'
import React, { ReactNode } from 'react'
import { useForms } from '../common/FormProvider'
import { SpectrumPickerProps } from "@react-types/select";


type ManagedPickerProps<T> = SpectrumPickerProps<any> & {
  id:keyof T,
  items:any,
  children?:ReactNode
}

export default function ManagedPicker<T>(props:ManagedPickerProps<T>) {
  const { children, ...otherProps } = props

  const {onChange} = useForms();

  function handleOnSelectionChange(value){
    onChange?.(props.id,value)
    props.onSelectionChange?.(value)
  }

  return (
    <Picker {...otherProps} onSelectionChange={handleOnSelectionChange}>
      {props.items?.map?.(item=><Item key={item.value}>{item.text}</Item>)}
    </Picker>
  )
}
