import {createContext, useContext, useReducer} from "react";
import React from "react";

//prepare data layer 
export const StateContext = createContext();

//preparing reducer
export const initialState = {
    email: "",
    authToken: ""
}

export const reducer = (state, action) => {
    switch(action) {
        case "SOMETHING": 
            return state;
        default: 
            return state;
    }
}

//wrap our app and provide the data layer
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );

// Pull information from the data layer
export const useStateValue = () => useContext(StateContext);

