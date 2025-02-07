import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import React from "react";
import airportBanner from "@/assets/airport-banner.jpg";
const Home = () => {
  const headerDom = (
    <React.Fragment>
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
        variant="h2"
        fontWeight={"bold"}
        sx={{ mt: 1, mb: 3, fontSize: { xs: "1.2rem", md: "1.5rem" } }}
        textAlign={"center"}
      >
        Explore Flights
      </Typography>
    </React.Fragment>
  );
  return (
    <Box>
      {headerDom} <Card></Card>
    </Box>
  );
};

export default Home;
