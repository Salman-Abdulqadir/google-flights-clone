// src/pages/FlightsPage.js
import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useSearchParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Skeleton, Alert, Paper, Chip, useTheme } from "@mui/material";
import { SkyScrapperApi } from "../../apis/skyScrapperApi";
import {
  searchParamsToObject,
  validateSearchParams,
  createFlightDetailsUrl,
} from "../../utils/urlUtils";
import { useFlightsContext } from "../../contexts/FlightsContext";
import FlightCard from "../../components/FlightCard";
import dayjs from "dayjs";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import EventIcon from "@mui/icons-material/Event";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
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
        color="primary"
      />
      <Chip
        icon={<EventIcon />}
        label={dayjs(params.date).format("DD MMM, YYYY")}
        color="primary"
      />
      <Chip
        icon={<AirlineSeatReclineNormalIcon />}
        label={params.cabinClass.replace("_", " ").toUpperCase()}
        color="primary"
      />
      <Chip
        icon={<PersonIcon />}
        label={`${totalPassengers} Passenger${totalPassengers > 1 ? "s" : ""}`}
        color="primary"
      />
      <Chip icon={<Money />} label={params.currency} color="primary" />
    </Box>
  );
};

const FlightsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setFlightsData, setSessionId, sessionId } = useFlightsContext();

  const params = searchParamsToObject(searchParams);
  const validation = validateSearchParams(params);
  const theme = useTheme();

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
        setSessionId(response.sessionId);
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
  const handleFlightCardClick = (itinerary) => {
    const detailsParams = {
      ...params,
      sessionId,
    };

    navigate(createFlightDetailsUrl(itinerary, detailsParams));
  };

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
          <FlightCard
            key={itinerary.id}
            itinerary={itinerary}
            onClick={() => handleFlightCardClick(itinerary)}
          />
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
      <Paper
        elevation={0}
        sx={{
          mb: 3,
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          p: 3,
          borderRadius: 2,
          background: `linear-gradient(to right, ${theme.palette.primary.main} 0%, rgba(0,0,0,0.8) 100%)`,
        }}
      >
        {/* Back Button */}
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(paths.home)}
          sx={{
            mb: 2,
            color: "primary.contrastText",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          Modify Search
        </Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { sm: "center" },
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h5" gutterBottom>
              Available Flights
            </Typography>
            <SearchSummary params={params} />
          </Box>
        </Box>
      </Paper>

      {getContent()}
    </Container>
  );
};

export default FlightsPage;
