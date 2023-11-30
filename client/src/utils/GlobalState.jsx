import React, { createContext, useContext, useReducer } from "react";
import { reducer } from './reducer'

const StoreContext = createContext();
const { Provider } = StoreContext;



const AppStoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
  });

  return <Provider value={[state, dispatch]} {...props} 
  
  > {props.children}</Provider> ;
};

const useStoreContext = () => useContext(StoreContext);
  


export { AppStoreProvider, useStoreContext };
