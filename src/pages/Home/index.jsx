import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import airportBanner from "@/assets/airport-banner.jpg";
import FlightOriginAndDestination from "../../components/FlightOriginAndDestination";
const Home = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        component="img"
        src={airportBanner}
        alt="Banner"
        sx={{
          width: "100%",
          height: { xs: "20vh", md: "25vh" },
          objectFit: "cover",
        }}
      />
      <Typography
        variant="h3"
        fontWeight={"bold"}
        sx={{ mt: 1, mb: 3 }}
        textAlign={"center"}
      >
        Flights
      </Typography>
      <FlightOriginAndDestination />
    </Box>
  );
};

export default Home;
