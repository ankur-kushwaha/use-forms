import React from 'react';

const withRegister = (WrappedComponent) => {
    return props => {
        const { id, max, validate, errorMessage } = props;
          const sampleCtx = React.useEffect(()=>{
            register?.(id, {
                validate: handleOnChange
              })
          },[]);
          <WrappedComponent
              {...props} />
      }
  };

export default withRegister;
