// src/pages/FlightsPage.js
import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import FlightCard from "../../components/FlightCard";
import { useFlightsContext } from "../../contexts/FlightsContext";
import { useNavigate } from "react-router";
import { paths } from "../../routes";
import Loader from "../../components/Loader";

const FlightsPage = () => {
  const { flightsData = {} } = useFlightsContext();
  const { itineraries = [], destinationImageUrl } = flightsData;
  const navigate = useNavigate();
  useEffect(() => {
    if (!itineraries?.length) {
      navigate(paths.home);
    }
  }, [itineraries]);
  if (!itineraries?.length) return <Loader enableText />;
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        position={"sticky"}
        top={"0px"}
        backgroundColor={"white"}
        py={"8px"}
      >
        <Button>Modify settings </Button>
        Available Flight Options
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {itineraries?.map((itinerary) => (
          <FlightCard key={itinerary.id} itinerary={itinerary} />
        ))}
      </Box>
      <Typography variant="h4" gutterBottom>
        Destination
      </Typography>
      <Box mb={4}>
        <img
          src={destinationImageUrl}
          alt="Destination"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "8px",
            maxHeight: "400px",
            objectFit: "cover",
          }}
        />
      </Box>
    </Container>
  );
};

export default FlightsPage;
