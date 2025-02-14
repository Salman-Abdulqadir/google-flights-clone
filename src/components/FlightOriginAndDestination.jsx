import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useHomeContext } from "@/contexts/HomeContext";
import { HomeContextActions } from "@/contexts/HomeContext/actions";
import AirportSelector from "./AirportSelector";
import DateRangePicker from "./DateRangePicker";
import { SkyScrapperApi } from "../apis/skyScrapperApi";
import dayjs from "dayjs";
import { useFlightsContext } from "../contexts/FlightsContext";
import { useNavigate } from "react-router";
import { paths } from "../routes";

const FlightOriginAndDestination = () => {
  const { state, dispatch } = useHomeContext();
  const { setFlightsData } = useFlightsContext();
  const navigate = useNavigate();
  const handleExploreFlights = async () => {
    const response = await SkyScrapperApi.searchFlights({
      originSkyId: state?.flightOrigin?.skyId,
      originEntityId: state?.flightOrigin?.entityId,
      destinationSkyId: state?.flightDestination?.skyId,
      destinationEntityId: state?.flightDestination?.entityId,
      date: dayjs(state?.flightStartDate).format("YYYY-MM-DD"),
      // returnDate: dayjs(state?.flightReturnDate).format("YYYY-MM-DD"),
      cabinClass: "economy",
      adults: "1",
      sortBy: "best",
      currency: "USD",
      market: "en-US",
      countryCode: "US",
    });
    if (response.status) {
      setFlightsData(response.data);
      navigate(paths.flights);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      alignItems="center"
      justifyContent="center"
      gap={2}
      width={"100%"}
      maxWidth={"1000px"}
    >
      <Box
        display="flex"
        flexDirection={{ md: "row", sm: "column", xs: "column" }}
        alignItems="center"
        justifyContent="center"
        gap={2}
        width={"100%"}
      >
        <AirportSelector
          label={"Where from?"}
          value={state.flightOrigin}
          onChange={(event, newValue) => {
            dispatch(HomeContextActions.setFlightOrigin(newValue));
          }}
        />
        <AirportSelector
          label={"Where to?"}
          value={state.flightDestination}
          onChange={(event, newValue) => {
            dispatch(HomeContextActions.setFlightDestination(newValue));
          }}
        />
        <DateRangePicker />
      </Box>
      <Button variant="contained" onClick={handleExploreFlights}>
        Explore Flights
      </Button>
    </Box>
  );
};

export default FlightOriginAndDestination;
