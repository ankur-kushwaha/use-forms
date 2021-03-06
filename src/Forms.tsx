import React from 'react'
import { Button, Flex, Item, View, TextField as RSTextField,Picker as RSPicker, DatePicker as RSDatePicker } from '@adobe/react-spectrum';
// import { DateValue, SpectrumCalendarProps, SpectrumRangeCalendarProps } from "@react-types/calendar";

import { SpectrumTextFieldProps } from '@react-types/textfield';
import { useForms } from './common/useForm';
import { SpectrumPickerProps } from "@react-types/select";
import { connectOnSelection } from './common/connectOnSelection';
import { connect } from './common/connect';

export type FormSchema = {
  name: string,
  age2:number,
  age: number,
  frequency: string,
  date:string
}

let TextField = connect<FormSchema,SpectrumTextFieldProps>(RSTextField);
let Picker = connect<FormSchema,SpectrumPickerProps<{}>>(RSPicker,[connectOnSelection]);
// let DatePicker = connect<FormSchema,SpectrumCalendarProps<any>>(RSDatePicker);

export default function Forms() {

  const { formData, errors, validateForm } = useForms<FormSchema>()
  console.log('Rendering forms',{ formData, errors });

  let ageValidationFn = React.useCallback((age)=> {
    console.log('validate', age, formData);

    if (age && age < 10) {
      return "age should be greater than 10"
    } else {
      return "";
    }
  },[formData])

  const hasErrors = Object.values(errors).filter(item => item).length > 0

  function handleSubmit() {
    let isValid = validateForm?.();

    if(isValid){
      console.log("Submitting form",formData);
    }
  }

  let items = [
    { value: "red panda", text: "Red Panda" },
    { value: "cat", text: "Cat" },
    { value: "dog", text: "Dog" },
    { value: "aardvark", text: "Aardvark" },
    { value: "kangaroo", text: "Kangaroo" },
    { value: "snake", text: "Snake" },
  ];

  return (<View padding={30}>
    <Flex direction={"column"} gap="size-150" wrap>
      <br />
      <header>
        <Flex direction={"row-reverse"}>
          <Button isDisabled={hasErrors} onPress={handleSubmit} variant="cta">Save</Button>
        </Flex>
      </header>

      <TextField
        defaultValue='test'
        type={"text"}
        isRequired
        id={"name"}
        label={"Name"}
      ></TextField>

      <TextField
        type={"number"}
        id={"age2"}
        label={"age2"}
        max={{
          value: 60,
          message: "Please enter value less than 60"
        }}
        validate={ageValidationFn}></TextField>

      <TextField
        type={"number"}
        id={"age"}
        label={"age"}
        isRequired
        max={{
          value: 60,
          message: "Please enter value less than 60"
        }}
        validate={ageValidationFn}></TextField>

       <Picker 
      isRequired id="frequency" label="Choose frequency" 
      >
        {items?.map?.(item=><Item key={item.value}>{item.text}</Item>)}
      </Picker>
{/*
      <DatePicker
      isRequired
        id={"date"}
        label={"Date"}
      /> */}

    </Flex>
    <hr />

    FormData: {JSON.stringify(formData)}
    <br />
    Errors: {JSON.stringify(errors)}
  </View>

  )
}
