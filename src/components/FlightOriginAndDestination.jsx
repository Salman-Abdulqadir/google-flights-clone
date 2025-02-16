import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useHomeContext } from "../contexts/HomeContext";
import { HomeContextActions } from "../contexts/HomeContext/actions";
import AirportSelector from "./AirportSelector";
import DateRangePicker from "./DateRangePicker";
import CabinClassSelector from "./CabinClassSelector";
import PassengerSelector from "./PassengerSelector";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { IconButton, Divider } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CurrencySelector from "./CurrencySelector";
import { createSearchUrl, validateSearchParams } from "../utils/urlUtils";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

const FlightOriginAndDestination = () => {
  const { state, dispatch } = useHomeContext();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [cabinClass, setCabinClass] = useState("economy");
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [currency, setCurrency] = useState("USD");

  // Create search params object
  const getSearchParams = () => ({
    originSkyId: state?.flightOrigin?.skyId,
    originEntityId: state?.flightOrigin?.entityId,
    destinationSkyId: state?.flightDestination?.skyId,
    destinationEntityId: state?.flightDestination?.entityId,
    date: state?.flightStartDate
      ? dayjs(state?.flightStartDate).format("YYYY-MM-DD")
      : null,
    cabinClass: cabinClass,
    adults: passengers.adults.toString(),
    children: passengers.children.toString(),
    infants: passengers.infants.toString(),
    sortBy: "best",
    currency: currency,
    market: "en-US",
    countryCode: "US",
  });

  const handleExploreFlights = () => {
    const params = getSearchParams();
    const validation = validateSearchParams(params);

    if (!validation.isValid) {
      setError(validation.message);
      return;
    }

    navigate(createSearchUrl(params));
  };

  const handleSwapAirports = () => {
    const origin = state.flightOrigin;
    const destination = state.flightDestination;
    dispatch(HomeContextActions.setFlightOrigin(destination));
    dispatch(HomeContextActions.setFlightDestination(origin));
  };

  return (
    <Box
      sx={{
        maxWidth: "lg",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        backgroundColor: "transparent",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
          backgroundColor: "trasparent",
        }}
      >
        {/* Top Controls */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <CabinClassSelector
            value={cabinClass}
            onChange={(e) => setCabinClass(e.target.value)}
          />
          <PassengerSelector value={passengers} onChange={setPassengers} />
          <CurrencySelector
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
        </Box>

        <Divider />

        {/* Airport Selectors */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 2,
            position: "relative",
          }}
        >
          <Box sx={{ flex: 1, width: "100%" }}>
            <AirportSelector
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FlightTakeoffIcon /> Where from?
                </Box>
              }
              value={state.flightOrigin}
              onChange={(event, newValue) => {
                dispatch(HomeContextActions.setFlightOrigin(newValue));
                setError("");
              }}
            />
          </Box>

          <IconButton
            onClick={handleSwapAirports}
            sx={{
              backgroundColor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              "&:hover": {
                backgroundColor: "primary.contrastText",
              },
              alignSelf: { xs: "flex-end", sm: "center" },
            }}
          >
            <SwapHorizIcon />
          </IconButton>

          <Box sx={{ flex: 1, width: "100%" }}>
            <AirportSelector
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FlightLandIcon /> Where to?
                </Box>
              }
              value={state.flightDestination}
              onChange={(event, newValue) => {
                dispatch(HomeContextActions.setFlightDestination(newValue));
                setError("");
              }}
            />
          </Box>
        </Box>

        <Divider />

        {/* Date Selector */}
        <Box>
          <DateRangePicker />
        </Box>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert
          severity="error"
          sx={{
            width: "100%",
            maxWidth: "400px",
            mx: "auto",
          }}
        >
          {error}
        </Alert>
      )}

      {/* Search Button */}
      <Button
        variant="contained"
        size="large"
        onClick={handleExploreFlights}
        sx={{
          width: { xs: "100%", sm: "auto" },
          minWidth: { sm: "200px" },
          alignSelf: "center",
          py: 1.5,
          px: 4,
          borderRadius: 2,
          backgroundColor: "primary.main",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
      >
        Explore
      </Button>
    </Box>
  );
};

export default FlightOriginAndDestination;
