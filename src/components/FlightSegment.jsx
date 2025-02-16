// src/components/FlightSegment.js

import { Box, Typography } from "@mui/material";

const FlightSegment = ({ segment }) => {
  const departureTime = new Date(segment.departure).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const arrivalTime = new Date(segment.arrival).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Box mb={1}>
      <Typography variant="body2" color="textSecondary">
        {segment.origin.displayCode} → {segment.destination.displayCode} |{" "}
        {departureTime} - {arrivalTime} | Flight: {segment.flightNumber}
      </Typography>
    </Box>
  );
};

export default FlightSegment;
