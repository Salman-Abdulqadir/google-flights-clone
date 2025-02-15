import React from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Drawer,
  Skeleton,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PricingOption from "./PricingOption";
import PriceOptionSkeleton from "./PriceOptionSkeleton";

const BookingOptionsDrawer = ({
  open,
  onClose,
  isLoading,
  bestPrice,
  pricingOptions = [],
}) => {
  const theme = useTheme();
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 400, md: 500 },
          p: 3,
        },
      }}
    >
      {/* Drawer Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h6" component="div">
            Booking Options
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Select your preferred booking option
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Best Price Banner */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2,
          background: `linear-gradient(to right, ${theme.palette.primary.main} 0%, rgba(0,0,0,0.8) 100%)`,
          color: "primary.contrastText",
        }}
      >
        <Typography variant="subtitle2">Best Available Price</Typography>
        <Typography variant="h4" component="div">
          {isLoading ? (
            <Skeleton width={100} height={40} />
          ) : (
            `${bestPrice.toLocaleString()} AED`
          )}
        </Typography>
      </Paper>

      {/* Booking Options List */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflowY: "auto",
          maxHeight: "calc(100vh - 200px)",
          "&::-webkit-scrollbar": {
            width: 8,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "rgba(0,0,0,0.1)",
            borderRadius: 4,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "primary.main",
            borderRadius: 4,
          },
        }}
      >
        {isLoading
          ? [...Array(4)].map((_, index) => <PriceOptionSkeleton key={index} />)
          : pricingOptions?.map((option) => (
              <PricingOption key={option.id} option={option} />
            ))}
      </Box>
    </Drawer>
  );
};

export default BookingOptionsDrawer;
