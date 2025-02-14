import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useHomeContext } from "@/contexts/HomeContext";
import { HomeContextActions } from "@/contexts/HomeContext/actions";
import AirportSelector from "./AirportSelector";
import DateRangePicker from "./DateRangePicker";
import CabinClassSelector from "./CabinClassSelector";
import PassengerSelector from './PassengerSelector';
import SearchBox from './SearchBox';
import { SkyScrapperApi } from "../apis/skyScrapperApi";
import dayjs from "dayjs";
import { useFlightsContext } from "../contexts/FlightsContext";
import { useNavigate } from "react-router";
import { paths } from "../routes";
import { useQuery } from "@tanstack/react-query";
import { IconButton, Divider } from "@mui/material";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CurrencySelector from './CurrencySelector';
import { createSearchUrl, validateSearchParams } from '../utils/urlUtils';

const FlightOriginAndDestination = () => {
  const { state, dispatch } = useHomeContext();
  const { setFlightsData } = useFlightsContext();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(0); // To trigger new searches
  const [cabinClass, setCabinClass] = useState('economy');
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });
  const [currency, setCurrency] = useState('USD');

  // Create search params object
  const getSearchParams = () => ({
    originSkyId: state?.flightOrigin?.skyId,
    originEntityId: state?.flightOrigin?.entityId,
    destinationSkyId: state?.flightDestination?.skyId,
    destinationEntityId: state?.flightDestination?.entityId,
    date: state?.flightStartDate ? dayjs(state?.flightStartDate).format("YYYY-MM-DD") : null,
    cabinClass: cabinClass,
    adults: passengers.adults.toString(),
    children: passengers.children.toString(),
    infants: passengers.infants.toString(),
    sortBy: "best",
    currency: currency,
    market: "en-US",
    countryCode: "US",
  });

  // Query for flight search
  const { isLoading, refetch } = useQuery({
    queryKey: ['flights', searchTrigger],
    queryFn: async () => {
      const params = getSearchParams();
      
      // Validate all required fields
      if (!params.originSkyId) {
        setError("Please select a departure airport");
        return
      }
      if (!params.destinationSkyId) {
        setError("Please select a destination airport");
        return
      }
      if (params.originSkyId === params.destinationSkyId) {
        setError("Departure and destination airports cannot be the same");
        return
      }
      if (!params.date) {
        setError("Please select a departure date");
        return
      }
      try{

        const response = await SkyScrapperApi.searchFlights(params);
        setFlightsData(response.data);
        navigate(paths.flights);
        setError("")
      }catch(e){
        setError(error.message);
      }
    },
    enabled: false,
    staleTime: 60 * 1000,
    cacheTime: 60 * 1000,
    retry: false
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
          maxWidth: 'lg',
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}
      >
        <SearchBox>
          {/* Top Controls */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,

            }}
          >
            <CabinClassSelector 
              value={cabinClass}
              onChange={(e) => setCabinClass(e.target.value)}
            />
            <PassengerSelector
              value={passengers}
              onChange={setPassengers}
            />
            <CurrencySelector
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            />
          </Box>

          <Divider />

          {/* Airport Selectors */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              gap: 2,
              position: 'relative'
            }}
          >
            <Box sx={{ flex: 1, width: '100%' }}>
              <AirportSelector
                label="Where from?"
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
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
                alignSelf: { xs: 'flex-end', sm: 'center' }
              }}
            >
              <SwapHorizIcon />
            </IconButton>
            
            <Box sx={{ flex: 1, width: '100%' }}>
              <AirportSelector
                label="Where to?"
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
        </SearchBox>

        {/* Error Alert */}
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              width: "100%",
              maxWidth: "400px",
              mx: 'auto'
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
          disabled={isLoading}
          sx={{
            width: { xs: '100%', sm: 'auto' },
            minWidth: { sm: '200px' },
            alignSelf: 'center',
            py: 1.5,
            px: 4,
            borderRadius: 2,
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
            }
          }}
        >
          {isLoading ? 'Searching...' : 'Explore'}
        </Button>
      </Box>

  );
};

export default FlightOriginAndDestination;
