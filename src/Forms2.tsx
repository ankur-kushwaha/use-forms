import { Button, Flex, Item, Picker, TextField, View } from '@adobe/react-spectrum';
import React from 'react'


type FormSchema = {
  name: string,
  age: number,
  frequency: string
}

export default function Forms() {

  const [formData, setFormData] = React.useState<FormSchema>({
    name:"",
    age:0,
    frequency:""
  });
  const [errors, setErrors] = React.useState({});

  let ageValidationFn = function (age, formData): string {
    console.log('validate', age, formData);

    if (age === undefined || age < 10) {
      return "age should be greater than 10"
    }else if(age>60){
      return "age should be less than 60"
    } else {
      return "";
    }
  }

  const hasErrors = Object.values(errors).filter(item => item).length > 0

  function validateForm() {
    handleNameChange(formData["name"])
    handleAgeChange(formData["age"])
  }

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
  ]

  function validateRequired(value) {
    return !!value;
  }

  function setData(key,value,hasErrors){
    setErrors(errors => {
      return {
        ...errors,
        [key]: hasErrors
      }
    })

    setFormData(formData => {
      return {
        ...formData,
        [key]: value
      }
    })
  }

  const handleNameChange = (value) => {
    let isValid = validateRequired(value)
    setData('name',value,isValid)
  }

  const handleAgeChange = (value) => {
    let validationMsg = ageValidationFn(value, formData)
    setData('age',value,validationMsg)
  }

  function handleFrequencyChange(value) {
    setFormData({
      ...formData,
      'frequency': value
    })
  }

  return (<View padding={30}>
    <Flex direction={"column"} gap="size-150" wrap>
      <br />

      <header>
        <Flex direction={"row-reverse"}>
          <Button isDisabled={hasErrors} onPress={handleSubmit} variant="cta">Save</Button>
        </Flex>
      </header>

      <TextField
        type={"text"}
        onChange={handleNameChange}
        isRequired
        id={"name"}
        validationState={!errors["name"] ? "valid" : "invalid"}
        label={"Name"}></TextField>

      <TextField
        onChange={handleAgeChange}
        type={"number"}
        id={"age"}
        label={"age"}
        validationState={!errors["age"] ? "valid" : "invalid"}
        errorMessage={errors["age"] || "Error"} />
      
      <Picker id="frequency" label="Choose frequency" onSelectionChange={handleFrequencyChange}>
        {items.map(item => <Item key={item.value}>{item.text}</Item>)}
      </Picker>
    </Flex>

    <hr />
    FormData: {JSON.stringify(formData)}
    <br />
    Errors: {JSON.stringify(errors)}
  </View>
  )
}
