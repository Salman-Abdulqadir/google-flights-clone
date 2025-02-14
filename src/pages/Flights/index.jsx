// src/pages/FlightsPage.js
import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSearchParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Skeleton, Alert, Paper, Chip, Divider } from "@mui/material";
import { SkyScrapperApi } from "../../apis/skyScrapperApi";
import {
  searchParamsToObject,
  validateSearchParams,
} from "../../utils/urlUtils";
import { useFlightsContext } from "../../contexts/FlightsContext";
import FlightCard from "../../components/FlightCard";
import dayjs from "dayjs";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import EventIcon from "@mui/icons-material/Event";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import PersonIcon from "@mui/icons-material/Person";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { Money } from "@mui/icons-material";
import FlightCardSkeleton from "../../components/FlightCardSkeleton";
import NoFlightsFound from "../../components/NoFlightsFound";
import { paths } from "../../routes";

const SearchSummary = ({ params }) => {
  const totalPassengers =
    Number(params.adults || 0) +
    Number(params.children || 0) +
    Number(params.infants || 0);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        backgroundColor: "grey.50",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 2,
        }}
      >
        <Chip
          icon={<FlightTakeoffIcon />}
          label={params.originSkyId}
          color="primary"
        />
        <Chip
          icon={<FlightLandIcon />}
          label={params.destinationSkyId}
          variant="outlined"
          color="primary"
        />
        <Chip
          icon={<EventIcon />}
          label={dayjs(params.date).format("DD MMM, YYYY")}
          variant="outlined"
          color="primary"
        />
        <Chip
          icon={<AirlineSeatReclineNormalIcon fontSize="md" />}
          label={params.cabinClass.replace("_", " ").toUpperCase()}
          variant="outlined"
          color="primary"
        />
        <Chip
          icon={<PersonIcon />}
          label={`${totalPassengers} Passenger${
            totalPassengers > 1 ? "s" : ""
          }`}
          variant="outlined"
          color="primary"
        />
        <Chip
          icon={<Money />}
          label={params.currency}
          variant="outlined"
          color="primary"
        />
      </Box>
    </Paper>
  );
};

const FlightsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setFlightsData } = useFlightsContext();

  const params = searchParamsToObject(searchParams);
  const validation = validateSearchParams(params);

  useEffect(() => {
    if (!validation.isValid) {
      navigate("/", { replace: true });
    }
  }, [validation.isValid, navigate]);

  const { isLoading, error } = useQuery({
    queryKey: ["flights", searchParams.toString()],
    queryFn: async () => {
      try {
        const response = await SkyScrapperApi.searchFlights(params);
        setFlightsData(response.data);
        return response.data;
      } catch (e) {
        throw new Error("Failed to fetch flights. Please try again.");
      }
    },
    enabled: validation.isValid,
    staleTime: 60 * 1000,
    cacheTime: 60 * 1000,
    retry: false,
  });

  if (!validation.isValid) {
    return null;
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error.message}
      </Alert>
    );
  }

  const { flightsData = {} } = useFlightsContext();
  const { itineraries = [] } = flightsData;
  const getContent = () => {
    if (isLoading) {
      return (
        <Box sx={{ width: "100%", p: 2 }}>
          {[...Array(3)].map((_, i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <FlightCardSkeleton />
            </Box>
          ))}
        </Box>
      );
    }
    if (!Array.isArray(itineraries) || !itineraries?.length) {
      return <NoFlightsFound onRetry={() => navigate(paths.home)} />;
    }
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {itineraries?.map((itinerary) => (
          <FlightCard key={itinerary.id} itinerary={itinerary} />
        ))}
      </Box>
    );
  };
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        display: "flex",
        flexDirection: "column",
        flex: "1",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Available Flights
      </Typography>
      <SearchSummary params={params} />
      {getContent()}
    </Container>
  );
};

export default FlightsPage;
