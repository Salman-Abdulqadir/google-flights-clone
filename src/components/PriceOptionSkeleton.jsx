import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import Skeleton from "@mui/material/Skeleton";

const PriceOptionSkeleton = () => {
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
        <Skeleton variant="text" width={120} height={24} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Rating value={0} precision={0.1} readOnly size="small" />
          <Skeleton variant="text" width={80} height={16} />
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
        <Skeleton variant="text" width={80} height={28} />
        <Skeleton variant="rectangular" width={80} height={36} />
      </Box>
    </Paper>
  );
};

export default PriceOptionSkeleton;
