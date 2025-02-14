import { createContext, useContext, useReducer } from "react";
import { reducer, initialValues } from "./reducer";

const HomeContext = createContext({});

export const HomeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);
  return (
    <HomeContext.Provider value={{ state, dispatch }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error(
      "useHomeContext must be used within a <HomeContextProvider>"
    );
  }
  return context;
};
