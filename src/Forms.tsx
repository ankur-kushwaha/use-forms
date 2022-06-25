import React from 'react'
import { Button, Flex, Item, Picker, TextField, View } from '@adobe/react-spectrum';
import { SpectrumTextFieldProps } from '@react-types/textfield';
import { connect} from './common/Connect';
import { useForms } from './common/FormProvider';
import { connectPicker } from './common/ConnectPicker';
// import Picker, { } from './ManagedComponents/Picker';

type FormSchema = {
  name: string,
  age2:number,
  age: number,
  frequency: string
}

let Input3 = connect<FormSchema, SpectrumTextFieldProps>(TextField)
let ConnectedPicker = connectPicker<FormSchema>(Picker);

export default function Forms() {
  const { formData, errors, validateForm } = useForms<FormSchema>()
  console.log('Rendering forms',{ formData, errors });


  let ageValidationFn = function (age): string {
    console.log('validate', age, formData);

    if (age && age < 10) {
      return "age should be greater than 10"
    } else {
      return "";
    }
  }

  

  const hasErrors = Object.values(errors).filter(item => item).length > 0

  function handleSubmit() {
    validateForm?.();
    console.log(formData);
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

      <Input3
        type={"text"}
        value={formData.name}
        isRequired
        id={"name"}
        label={"Name"}
      ></Input3>

      <Input3
        type={"number"}
        id={"age2"}
        label={"age2"}
        max={{
          value: 60,
          message: "Please enter value less than 60"
        }}
        validate={ageValidationFn}></Input3>

      <Input3
        type={"number"}
        id={"age"}
        label={"age"}
        isRequired
        max={{
          value: 60,
          message: "Please enter value less than 60"
        }}
        validate={ageValidationFn}></Input3>

      <ConnectedPicker isRequired id="frequency" label="Choose frequency" >
        {items?.map?.(item=><Item key={item.value}>{item.text}</Item>)}
      </ConnectedPicker>

    </Flex>
    <hr />

    FormData: {JSON.stringify(formData)}
    <br />
    Errors: {JSON.stringify(errors)}
  </View>

  )
}
