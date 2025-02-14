// src/contexts/FlightsContext.js
import React, { createContext, useContext, useState } from "react";

const FlightsContext = createContext();

export const FlightsProvider = ({ children }) => {
  const [flightsData, setFlightsData] = useState({});
  const [sessionId, setSessionId] = useState({});

  return (
    <FlightsContext.Provider
      value={{ flightsData, setFlightsData, sessionId, setSessionId }}
    >
      {children}
    </FlightsContext.Provider>
  );
};

export const useFlightsContext = () => {
  const context = useContext(FlightsContext);
  return context;
};
