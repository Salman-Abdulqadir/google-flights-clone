import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import dayjs from "dayjs";

const FlightDetailsSegment = ({ segment, isLastSegment }) => {
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
          <img
            src={segment.marketingCarrier.logo}
            alt={segment.marketingCarrier.name}
            style={{ width: 32, height: 32, objectFit: "contain" }}
          />
          <Box>
            <Typography variant="subtitle2">
              {segment.marketingCarrier.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Flight {segment.flightNumber}
            </Typography>
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
              <Typography variant="h6">
                {dayjs(segment.departure).format("HH:mm")}
              </Typography>
              <Typography variant="body2">{segment.origin.city}</Typography>
              <Typography variant="caption" color="text.secondary">
                {segment.origin.name} ({segment.origin.displayCode})
              </Typography>
            </Box>

            {/* Duration */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {dayjs
                  .duration(segment.duration, "minutes")
                  .format("H[h] m[m]")}
              </Typography>
              {isMobile ? <SwapVertIcon /> : <SwapHorizIcon />}
            </Box>

            {/* Arrival */}
            <Box sx={{ textAlign: { sm: "right" } }}>
              <Typography variant="h6">
                {dayjs(segment.arrival).format("HH:mm")}
              </Typography>
              <Typography variant="body2">
                {segment.destination.city}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {segment.destination.name} ({segment.destination.displayCode})
              </Typography>
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
          <Typography variant="body2" color="text.secondary">
            {segment.goodToKnowItems?.[1]?.body?.value?.replace(/<[^>]*>/g, "")}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FlightDetailsSegment;
