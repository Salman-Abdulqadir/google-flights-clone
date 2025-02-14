import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";

const Loader = ({
  text = "Loading...",
  enableText = false,
  size = 24,
  skeleton = false,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
        width: "100%",
        height: "100%",
      }}
    >
      {skeleton ? (
        <>
          <Skeleton variant="rectangular" width={"100%"} height={36} />
          <Skeleton variant="rectangular" width={"100%"} height={36} />
        </>
      ) : (
        <CircularProgress size={size} />
      )}

      {enableText && <Typography>{text}</Typography>}
    </Box>
  );
};

export default Loader;
