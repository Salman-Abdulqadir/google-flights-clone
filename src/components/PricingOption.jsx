import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import VerifiedIcon from "@mui/icons-material/Verified";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const PricingOption = ({ option }) => {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "primary.main",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
              {option.agents[0].name}
            </Typography>
            {option.agents[0].rating.value >= 4.5 && (
              <VerifiedIcon color="primary" sx={{ fontSize: 16 }} />
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Rating
              value={option.agents[0].rating.value}
              precision={0.1}
              readOnly
              size="small"
            />
            <Typography variant="caption" color="text.secondary">
              {option.agents[0].rating.value.toFixed(1)}/5 (
              {option.agents[0].rating.count.toLocaleString()} reviews)
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="h6"
          color="primary.main"
          sx={{ fontWeight: "bold" }}
        >
          {option.totalPrice.toLocaleString()} AED
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        endIcon={<OpenInNewIcon />}
        href={option.agents[0].url}
        target="_blank"
        rel="noopener noreferrer"
        fullWidth
        sx={{
          mt: "auto",
          textTransform: "none",
          py: 1,
        }}
      >
        Book Now
      </Button>
    </Paper>
  );
};

export default PricingOption;
