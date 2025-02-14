import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  Skeleton,
} from "@mui/material";

const FlightCardSkeleton = () => {
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
    >
      <CardContent>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Flight Details Skeleton */}
          <Box flex={1} mb={{ xs: 2, md: 0 }} pr={{ md: 2 }}>
            <Skeleton variant="text" width="80%" height={28} />
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="40%" height={20} />
            <Skeleton variant="text" width="50%" height={20} />
            <Skeleton variant="text" width="70%" height={20} />
          </Box>

          {/* Carrier Logos & Flight Segments Skeleton */}
          <Box flex={1} mb={{ xs: 2, md: 0 }} pr={{ md: 2 }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              {[...Array(3)].map((_, index) => (
                <Skeleton
                  key={index}
                  variant="circular"
                  width={32}
                  height={32}
                />
              ))}
            </Box>
            <Box>
              {[...Array(2)].map((_, index) => (
                <Skeleton key={index} variant="text" width="100%" height={20} />
              ))}
            </Box>
          </Box>

          {/* Price Skeleton */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minWidth={100}
            pl={{ md: 2 }}
          >
            <Skeleton variant="text" width={80} height={32} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FlightCardSkeleton;
