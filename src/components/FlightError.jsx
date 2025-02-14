import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AirplanemodeInactiveIcon from "@mui/icons-material/AirplanemodeInactive";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const FlightError = ({ message, onRetry }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
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
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <Box
            sx={{
              position: "relative",
              width: isMobile ? "150px" : "200px",
              height: isMobile ? "150px" : "200px",
              margin: "0 auto",
              mb: 3,
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AirplanemodeInactiveIcon
                sx={{
                  fontSize: isMobile ? "5rem" : "7rem",
                  color: "error.main",
                  opacity: 0.8,
                }}
              />
            </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ErrorOutlineIcon
                sx={{
                  fontSize: isMobile ? "8rem" : "10rem",
                  color: "error.light",
                  opacity: 0.2,
                }}
              />
            </motion.div>
          </Box>
        </motion.div>
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
      <Typography variant="h5" fontWeight="bold" color="error" gutterBottom>
        Opps! Something went wrong
      </Typography>
      {message && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: "600px", mx: "auto" }}
        >
          {message}
        </Typography>
      )}

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
        Go back to browsing flights
      </Button>
    </Box>
  );
};

export default FlightError;
