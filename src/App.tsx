import { defaultTheme, Flex, Provider } from '@adobe/react-spectrum';
import Forms from './Forms';
import Forms2 from './Forms2';
import { FormProvider } from './common/FormProvider';

import './App.css';

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
