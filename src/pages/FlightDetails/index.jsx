import React, { useEffect } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  Divider,
  Alert,
  Skeleton,
  Button,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { paths } from "../../routes";
import PricingOption from "../../components/PricingOption";
import FlightDetailsSegment from "../../components/FlightDetailsSegment";
import {
  searchParamsToObject,
  validateFlightDetailsParams,
} from "../../utils/urlUtils";
import { SkyScrapperApi } from "../../apis/skyScrapperApi";
import PriceOptionSkeleton from "../../components/PriceOptionSkeleton";
import FlightDetailsSegmentSkeleton from "../../components/FlightDetailsSegmentSkeleton";
import FlightError from "../../components/FlightError";
dayjs.extend(duration);

const FlightDetailsPage = () => {
  const { origin, destination } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

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
      } catch (e) {
        throw new Error("Failed to fetch flight details. Please try again.");
      }
    },
    enabled: validation.isValid,
    staleTime: 60 * 1000,
    cacheTime: 60 * 1000,
    retry: false,
  });
  console.log("isLoading", isLoading);

  if (error) {
    return (
      <FlightError message={error?.message} onRetry={() => navigate(-1)} />
    );
  }

  const flight = flightDetails?.itinerary;
  const bestPrice = isLoading
    ? 0
    : Math.min(...flight?.pricingOptions?.map((option) => option.totalPrice));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Flight Summary */}
      <Paper
        elevation={0}
        sx={{
          mb: 3,
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          p: 3,
          borderRadius: 2,
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
              color: "secondary",
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
                    <Skeleton variant="text" width={50} height={50} />
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
                    <Skeleton variant="text" width={50} height={50} />
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
                    <Skeleton variant="text" width={50} height={50} />
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
              <Skeleton variant="text" width={120} height={50} />
            ) : (
              <Typography variant="h4">
                {bestPrice.toLocaleString()} AED
              </Typography>
            )}

            <Typography variant="caption">Best available price</Typography>
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

      {/* Booking Options */}
      <Typography
        variant="h6"
        gutterBottom
        component={Box}
        display="flex"
        alignItems="center"
        gap={1}
      >
        <FlightTakeoffIcon fontSize="small" />
        Booking Options
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, // 1 column on small screens, 2 columns on medium and larger screens
          gap: 2,
        }}
      >
        {isLoading
          ? [...Array(4)].map((_, index) => <PriceOptionSkeleton key={index} />)
          : flight.pricingOptions?.map((option) => (
              <PricingOption key={option.id} option={option} />
            ))}
      </Box>
    </Container>
  );
};

export default FlightDetailsPage;
