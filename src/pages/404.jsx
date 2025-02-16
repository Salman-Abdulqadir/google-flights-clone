import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { paths } from "../routes";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: { xs: "4rem", md: "6rem" }, fontWeight: "bold" }}
      >
        404
      </Typography>
      <Typography
        variant="h5"
        sx={{ mt: 1, mb: 3, fontSize: { xs: "1.2rem", md: "1.5rem" } }}
      >
        {"Oops! The page you're looking for doesn't exist."}
      </Typography>
      <Box
        component="img"
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        alt="Not Found"
        sx={{
          width: { xs: "80%", sm: "60%", md: "40%" },
          maxWidth: "500px",
          mb: 3,
        }}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => navigate(paths.home)}
        sx={{ textTransform: "none", fontSize: "1rem" }}
      >
        Go Back Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
