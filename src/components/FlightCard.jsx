// src/components/FlightCard.js

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import FlightSegment from "./FlightSegment";

const FlightCard = ({ itinerary, onClick }) => {
  const leg = itinerary.legs[0];
  const {
    origin,
    destination,
    departure,
    arrival,
    durationInMinutes,
    stopCount,
    segments,
    carriers,
  } = leg;

  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;
  const formattedDuration = `${hours}h ${minutes}m`;

  const departureTime = new Date(departure).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const arrivalTime = new Date(arrival).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card
      sx={{
        mb: 2,
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
        transition: "transform 0.3s ease",
        cursor: "pointer",
        "&:hover": { transform: "scale(1.02)" },
      }}
      onClick={() => onClick(itinerary)}
    >
      <CardContent>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Flight Details */}
          <Box flex={1} mb={{ xs: 2, md: 0 }} pr={{ md: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {origin.city} ({origin.displayCode}) → {destination.city} (
              {destination.displayCode})
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {origin.name} to {destination.name}
            </Typography>
            <Typography variant="body2">Departure: {departureTime}</Typography>
            <Typography variant="body2">Arrival: {arrivalTime}</Typography>
            <Typography variant="body2">
              Duration: {formattedDuration} | Stops: {stopCount}
            </Typography>
          </Box>

          {/* Carrier Logos & Flight Segments */}
          <Box flex={1} mb={{ xs: 2, md: 0 }} pr={{ md: 2 }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              {carriers.marketing.map((carrier) => (
                <Avatar
                  key={carrier.id}
                  alt={carrier.name}
                  src={carrier.logoUrl}
                  sx={{ width: 32, height: 32 }}
                />
              ))}
            </Box>
            <Box>
              {segments.map((segment) => (
                <FlightSegment key={segment.id} segment={segment} />
              ))}
            </Box>
          </Box>

          {/* Price */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minWidth={100}
            pl={{ md: 2 }}
          >
            <Typography
              variant="h5"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              {itinerary.price.formatted}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
