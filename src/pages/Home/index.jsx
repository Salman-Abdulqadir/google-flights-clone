import React from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FlightOriginAndDestination from "../../components/FlightOriginAndDestination";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/images/hero-bg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          zIndex: -1,
        },
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 4, md: 8 },
          pb: { xs: 6, md: 12 },
          color: "white",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              mb: 6,
            }}
          >
            <FlightTakeoffIcon
              sx={{
                fontSize: { xs: 48, md: 64 },
                mb: 2,
                transform: "rotate(-45deg)",
              }}
            />
            <Typography
              variant={isMobile ? "h3" : "h2"}
              component="h1"
              sx={{
                fontWeight: "bold",
              }}
            >
              Discover Your Next Adventure
            </Typography>
            <Typography
              variant="h6"
              sx={{
                maxWidth: "600px",
                color: "rgba(255, 255, 255, 0.9)",
              }}
            >
              Find and compare the best flight deals from hundreds of airlines
            </Typography>
          </Box>

          {/* Search Form Section */}
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: 4,
              p: { xs: 2, md: 4 },
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10px)",
              maxWidth: "1000px",
              mx: "auto",
            }}
          >
            <FlightOriginAndDestination />
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 4,
            py: 8,
          }}
        >
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                p: 3,
                borderRadius: 2,
                textAlign: "center",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              {feature.icon}
              <Typography variant="h6" sx={{ mb: 1, color: "text.primary" }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

// Feature cards data
const features = [
  {
    icon: (
      <FlightTakeoffIcon sx={{ fontSize: 40, color: "primary.main", mb: 2 }} />
    ),
    title: "Best Flight Deals",
    description: "Compare prices from hundreds of airlines and travel agencies",
  },
  {
    icon: (
      <FlightTakeoffIcon sx={{ fontSize: 40, color: "primary.main", mb: 2 }} />
    ),
    title: "Flexible Dates",
    description: "Find the best prices with our flexible date search",
  },
  {
    icon: (
      <FlightTakeoffIcon sx={{ fontSize: 40, color: "primary.main", mb: 2 }} />
    ),
    title: "24/7 Support",
    description: "Get assistance anytime, anywhere with our customer support",
  },
];

export default HomePage;
