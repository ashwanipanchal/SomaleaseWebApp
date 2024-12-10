// GlobalState.js
import React, { createContext, useState } from 'react';

// Create a Context
export const GlobalContext = createContext();

// Create a Provider component
export const GlobalProvider = ({ children }) => {
  const [globalData, setGlobalData] = useState({
    user: {},
    Add_Flat_Lat_Lon: {},
    Updated_Res_Data: {},
    Add_Flat_ID: "",
    theme: 'light',
    user_id: "",
    bridge_id: ""
    // Add any other global state here
  });

  return (
    <GlobalContext.Provider value={{ globalData, setGlobalData }}>
      {children}
    </GlobalContext.Provider>
  );
};
