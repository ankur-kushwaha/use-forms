import { ConnectBaseProps, connectOnChange } from "./connectOnChange";

export type Connect = (Component: React.FunctionComponent<any>) => React.FunctionComponent<any>
export function connect<S,T>(Component,optionalConnects?:Connect[]) {
    let connects:Connect[] = [];
  
    //register default 
    connects.push(connectOnChange);
  
    if(optionalConnects && optionalConnects.length){
      connects = connects.concat(optionalConnects);
    }
  
    console.log('connected plugins',connects);
    
    let Comp = Component;
    for(let connectPlugin of connects.reverse()){
      Comp = connectPlugin(Comp)
    }
    return Comp as React.FunctionComponent<ConnectBaseProps<S> & T>
  };
  