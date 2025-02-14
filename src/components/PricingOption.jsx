import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";

const PricingOption = ({ option }) => {
  return (
    <Paper
      sx={{
        p: 3,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { sm: "center" },
        gap: 2,
        flex: 1,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1">{option.agents[0].name}</Typography>
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
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", sm: "column" },
          alignItems: { xs: "center", sm: "flex-end" },
          gap: 2,
        }}
      >
        <Typography variant="h6">
          {option.totalPrice.toLocaleString()} AED
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href={option.agents[0].url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book
        </Button>
      </Box>
    </Paper>
  );
};

export default PricingOption;
