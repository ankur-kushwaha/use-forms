import { Button, Flex, Item, View } from '@adobe/react-spectrum';
import React from 'react'
import { useForms } from './common/FormProvider';
import { Input } from './ManagedComponents/Input';
import Picker, { } from './ManagedComponents/Picker';

type FormSchema = {
  name: string,
  age: number,
  frequency: string
}

export default function Forms() {
  const { formData, errors, validateForm } = useForms<FormSchema>()

  

  let ageValidationFn = function (age, formData): string {
    console.log('validate', age, formData);

    if (age == undefined || age < 10) {
      return "age should be greater than 10"
    } else {
      return "";
    }
  }

  console.log({ formData, errors });

  const hasErrors = Object.values(errors).filter(item => item).length > 0

  function handleSubmit() {
    validateForm?.();
    console.log(formData);
  }

  let items =  [
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

      <Input<FormSchema>
        type={"text"}
        isRequired
        id={"name"}
        label={"Name"}></Input>

      <Input
        type={"number"}
        id={"age"}
        label={"age"+formData.name}
        max={{
          value:60,
          msg:"Please enter value less than 60"
        }}
        validate={ageValidationFn}></Input>

      <Picker<FormSchema> id="frequency" label="Choose frequency" items={items}>

      </Picker>

    </Flex>
    <hr />

    FormData: {JSON.stringify(formData)}
    <br />
    Errors: {JSON.stringify(errors)}
  </View>

  )
}
