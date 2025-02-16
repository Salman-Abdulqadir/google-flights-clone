import { HomeContextProvider } from "./HomeContext";
import { FlightsProvider } from "./FlightsContext";

const AppContextProvider = ({ children }) => {
  return (
    <HomeContextProvider>
      <FlightsProvider>{children}</FlightsProvider>
    </HomeContextProvider>
  );
};

export default AppContextProvider;
