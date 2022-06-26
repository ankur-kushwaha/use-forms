import { TextField } from '@adobe/react-spectrum';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { FormSchema } from '../../Forms';
import { connect, connectOnChange } from '../Connect';
import { FormProvider } from '../FormProvider';
import { useForms } from '../useForm';
import { Button, Flex, Item, View, TextField as RSTextField, Picker as RSPicker, DatePicker as RSDatePicker } from '@adobe/react-spectrum';
import { DateValue, SpectrumCalendarProps, SpectrumRangeCalendarProps } from "@react-types/calendar";
import { SpectrumTextFieldProps } from '@react-types/textfield';


function TestForm({ onChange, children }) {
  const useFormResponse = useForms<FormSchema>();

  React.useEffect(() => {
    onChange(useFormResponse)
  }, [useFormResponse, onChange])

  return <>
    {children}
  </>
}

describe('first', () => {

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('connectOnChange formdata update', () => {
    type FormSchema = {
      name: string
    }

    let Test2 = connectOnChange<FormSchema>(TextField)

    let mockFn = jest.fn();

    render(<FormProvider>
      <TestForm onChange={mockFn}>
        <Test2 data-test-id="name" label='name' id={"name"}></Test2>
      </TestForm>
    </FormProvider>)

    fireEvent.change(screen.getByLabelText('name'), {
      target: {
        value: "hello"
      }
    });

    expect(mockFn).toHaveBeenNthCalledWith(3, expect.objectContaining({
      formData: {
        "name": "hello",
      }
    }))
  });

  test('connectOnChange required validation', () => {
    type FormSchema = {
      name: string
    }

    let Test2 = connectOnChange<FormSchema>(TextField)

    let mockFn = jest.fn();

    render(<FormProvider>
      <TestForm onChange={mockFn}>
        <Test2 isRequired data-testid="name" label='name' id={"name"}></Test2>
      </TestForm>
    </FormProvider>)

    fireEvent.change(screen.getByTestId('name'), {
      target: {
        value: "hello"
      }
    });

    fireEvent.change(screen.getByTestId('name'), {
      target: {
        value: ""
      }
    });

    expect(mockFn).toHaveBeenNthCalledWith(4, expect.objectContaining({
      errors: {
        name: "Required"
      },
      formData: {
        "name": "",
      }
    }))

  })

  test('connectOnChange max validation', () => {
    type FormSchema = {
      name: string
    }

    let Test2 = connectOnChange<FormSchema>(TextField)

    let mockFn = jest.fn();

    render(<FormProvider>
      <TestForm onChange={mockFn}>
        <Test2 isRequired max={{
          value: 10,
          message: "text should be less than 10"
        }} data-testid="name" label='name' id={"name"}></Test2>
      </TestForm>
    </FormProvider>)

    fireEvent.change(screen.getByTestId('name'), {
      target: {
        value: "40"
      }
    });


    expect(mockFn).toHaveBeenNthCalledWith(3, expect.objectContaining({
      errors: {
        name: "text should be less than 10"
      },
      formData: {
        "name": "40",
      }
    }))

  })


  test('connectOnChange min validation', () => {
    let TextField = connect<FormSchema, SpectrumTextFieldProps>(RSTextField);

    const mockFn = jest.fn();

    render(<FormProvider>
      <TestForm onChange={mockFn}>
        <TextField type='number' min={{
          value: 10,
          message: "text should be less than 10"
        }} data-testid="name" label='name' id={"name"}></TextField>
      </TestForm>
    </FormProvider>)

    fireEvent.change(screen.getByTestId('name'), {
      target: {
        value: "5"
      }
    });

    expect(mockFn).toHaveBeenNthCalledWith(3, expect.objectContaining({
      errors: {
        name: "text should be less than 10"
      },
      formData: {
        "name": "5",
      }
    }))

  });

  test('connectOnChange email validation', () => {
    let TextField = connect<FormSchema, SpectrumTextFieldProps>(RSTextField);

    const mockFn = jest.fn();

    render(<FormProvider>
      <TestForm onChange={mockFn}>
        <TextField type='email' errorMessage={"Invalid email"} data-testid="name" label='name' id={"name"}></TextField>
      </TestForm>
    </FormProvider>)

    fireEvent.change(screen.getByTestId('name'), {
      target: {
        value: "ankur"
      }
    });

    expect(mockFn).toHaveBeenLastCalledWith(expect.objectContaining({
      errors: {
        name: "Invalid email"
      },
      formData: {
        "name": "ankur",
      }
    }))
  });
})