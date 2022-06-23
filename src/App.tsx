import React from 'react';
import logo from './logo.svg';
import { Button, defaultTheme, Flex, Provider } from '@adobe/react-spectrum';
import './App.css';
import { FormProvider } from './common/FormProvider';
import Forms from './Forms';
import Forms2 from './Forms2';


function App() {
  return (
    <div className="App">

      <Provider theme={defaultTheme}>
        <Flex>
          <div>
            <FormProvider>
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
