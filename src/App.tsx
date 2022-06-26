import React from 'react';
import logo from './logo.svg';
import { Button, defaultTheme, Flex, Provider } from '@adobe/react-spectrum';
import './App.css';
// import { FormProvider } from './common/FormProvider';
import Forms, { FormSchema } from './Forms';
import Forms2 from './Forms2';
import {  FormProvider, FormContext } from './common/FormProvider';
import { connectOnChange, registerConnect } from './common/Connect';
import { connectOnSelection } from './common/ConnectPicker';

function App() {
  return (
    <div className="App">

      <Provider theme={defaultTheme}>
        <Flex>
          <div>
            <FormProvider >
              <Forms></Forms>
            </FormProvider>
          </div>
          <div>
              <Forms2></Forms2>
          </div>
        </Flex>
      </Provider>


    </div>
  );
}

export default App;
