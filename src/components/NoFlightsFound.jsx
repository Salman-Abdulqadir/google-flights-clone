import { Box, Typography, Button } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const NoFlightsFound = ({ onRetry }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: "1",
      }}
    >
      {/* Icon Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          mb: 2,
        }}
      >
        <FlightTakeoffIcon sx={{ fontSize: 60, color: "primary.main" }} />
        <SentimentDissatisfiedIcon
          sx={{
            fontSize: 32,
            color: "error.main",
            position: "absolute",
            transform: "translate(20px, -10px)",
          }}
        />
      </Box>

      {/* Message Section */}
      <Typography
        variant="h5"
        fontWeight="bold"
        color="text.primary"
        gutterBottom
      >
        No Flights Found
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Try adjusting your search filters or check back later.
      </Typography>

      {/* Action Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={onRetry}
        sx={{
          textTransform: "none",
          px: 3,
          py: 1,
        }}
      >
        Adjust Search
      </Button>
    </Box>
  );
};

export default NoFlightsFound;
