import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  Divider,
  Skeleton,
  Button,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import FlightDetailsSegment from "../../components/FlightDetailsSegment";
import {
  searchParamsToObject,
  validateFlightDetailsParams,
} from "../../utils/urlUtils";
import { SkyScrapperApi } from "../../apis/skyScrapperApi";
import FlightDetailsSegmentSkeleton from "../../components/FlightDetailsSegmentSkeleton";
import FlightError from "../../components/FlightError";
import { useTheme } from "@mui/material/styles";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Fab from "@mui/material/Fab";
import BookingOptionsDrawer from "../../components/BookingOptionsDrawer";
dayjs.extend(duration);

const FlightDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const params = searchParamsToObject(searchParams);
  const validation = validateFlightDetailsParams({
    ...params,
    itineraryId: params.itineraryId,
  });

  useEffect(() => {
    if (!validation.isValid) {
      navigate("/", { replace: true });
    }
  }, [validation.isValid, navigate]);

  // Query for flight details
  const {
    data: flightDetails = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["flightDetails", params.itineraryId, params.sessionId],
    queryFn: async () => {
      try {
        const response = await SkyScrapperApi.getFlightDetails({
          ...params,
          itineraryId: params.itineraryId,
        });
        return response.data;
      } catch {
        throw new Error("Failed to fetch flight details. Please try again.");
      }
    },
    enabled: validation.isValid,
    staleTime: 60 * 1000,
    cacheTime: 60 * 1000,
    retry: false,
  });

  if (error) {
    return (
      <FlightError message={error?.message} onRetry={() => navigate(-1)} />
    );
  }

  const flight = flightDetails?.itinerary;
  const bestPrice =
    isLoading || !Array.isArray(flight.pricingOptions)
      ? 0
      : Math.min(...flight.pricingOptions.map((option) => option.totalPrice));

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Flight Summary */}
      <Paper
        elevation={0}
        sx={{
          mb: 3,
          position: "relative",
          color: "primary.contrastText",
          borderRadius: 2,
          overflow: "hidden",
          minHeight: "200px", // Ensure minimum height for the background
        }}
      >
        {/* Background Image with Gradient Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: isLoading
              ? `linear-gradient(to right, ${theme.palette.primary.main} 0%, rgba(0,0,0,0.8) 100%)`
              : `url(${flight?.destinationImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 1,
            },
          }}
        />

        {/* Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            p: 3,
          }}
        >
          {/* Back Button */}
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              mb: 2,
              color: "primary.contrastText",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            Back to Search Results
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
                Flight Details
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Chip
                  icon={<FlightTakeoffIcon />}
                  label={
                    isLoading ? (
                      <Skeleton
                        variant="text"
                        width={30}
                        height={25}
                        sx={{ backgroundColor: "primary.contrastText" }}
                      />
                    ) : (
                      flight?.legs[0].origin.city
                    )
                  }
                  color="primary"
                />
                <Chip
                  icon={<FlightLandIcon />}
                  label={
                    isLoading ? (
                      <Skeleton
                        variant="text"
                        width={30}
                        height={25}
                        sx={{ backgroundColor: "primary.contrastText" }}
                      />
                    ) : (
                      flight?.legs[0].destination.city
                    )
                  }
                  color="primary"
                />
                <Chip
                  icon={<AccessTimeIcon />}
                  label={
                    isLoading ? (
                      <Skeleton
                        variant="text"
                        width={30}
                        height={25}
                        sx={{ backgroundColor: "primary.contrastText" }}
                      />
                    ) : (
                      dayjs
                        .duration(flight?.legs[0].duration, "minutes")
                        .format("H[h] m[m]")
                    )
                  }
                  color="primary"
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "flex-start", sm: "flex-end" },
              }}
            >
              {isLoading ? (
                <Skeleton
                  variant="text"
                  width={120}
                  height={60}
                  sx={{ backgroundColor: "primary.contrastText" }}
                />
              ) : (
                <Typography variant="h4">
                  {bestPrice.toLocaleString()} AED
                </Typography>
              )}

              <Typography variant="caption">Best available price</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Flight Segments */}
      <Paper sx={{ mb: 4, overflow: "hidden" }}>
        {isLoading ? (
          <React.Fragment>
            <FlightDetailsSegmentSkeleton />
          </React.Fragment>
        ) : (
          flight?.legs[0].segments?.map((segment, index) => (
            <React.Fragment key={segment.id}>
              <FlightDetailsSegment
                segment={segment}
                isLastSegment={index === flight?.legs[0].segments.length - 1}
              />
              {index < flight?.legs[0].segments.length - 1 && <Divider />}
            </React.Fragment>
          ))
        )}
      </Paper>

      {/* Floating Action Button for Booking */}
      <Fab
        color="primary"
        variant="extended"
        onClick={toggleDrawer}
        disabled={isLoading}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
          boxShadow: (theme) => theme.shadows[4],
        }}
      >
        <ShoppingCartIcon sx={{ mr: 1 }} />
        Booking Options
      </Fab>

      {/* Booking Options Drawer */}
      <BookingOptionsDrawer
        open={drawerOpen}
        onClose={toggleDrawer}
        isLoading={isLoading}
        bestPrice={bestPrice}
        pricingOptions={flight?.pricingOptions}
      />
    </Container>
  );
};

export default FlightDetailsPage;
