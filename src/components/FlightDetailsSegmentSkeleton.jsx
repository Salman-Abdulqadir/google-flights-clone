import { Box, Skeleton, useTheme, useMediaQuery } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import SwapVertIcon from "@mui/icons-material/SwapVert";

const FlightDetailsSegmentSkeleton = ({ isLastSegment }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 4,
          p: 3,
        }}
      >
        {/* Carrier Info */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            minWidth: { sm: "200px" },
          }}
        >
          <Skeleton variant="circular" width={32} height={32} />
          <Box>
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="text" width={80} height={16} />
          </Box>
        </Box>

        {/* Flight Times */}
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { sm: "center" },
              gap: 2,
            }}
          >
            {/* Departure */}
            <Box>
              <Skeleton variant="text" width={50} height={28} />
              <Skeleton variant="text" width={100} height={20} />
              <Skeleton variant="text" width={140} height={16} />
            </Box>

            {/* Duration */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Skeleton variant="text" width={60} height={16} />
              {isMobile ? <SwapVertIcon /> : <SwapHorizIcon />}
            </Box>

            {/* Arrival */}
            <Box sx={{ textAlign: { sm: "right" } }}>
              <Skeleton variant="text" width={50} height={28} />
              <Skeleton variant="text" width={100} height={20} />
              <Skeleton variant="text" width={140} height={16} />
            </Box>
          </Box>
        </Box>
      </Box>

      {!isLastSegment && (
        <Box
          sx={{
            p: 2,
            backgroundColor: "grey.50",
            borderTop: "1px dashed",
            borderBottom: "1px dashed",
            borderColor: "divider",
          }}
        >
          <Skeleton variant="text" width="80%" height={16} />
        </Box>
      )}
    </Box>
  );
};

export default FlightDetailsSegmentSkeleton;
