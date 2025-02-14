import { Box, Container, Breadcrumbs } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const AppLayout = ({ children }) => {
  const location = useLocation();

  // Generate breadcrumbs based on current path
  const getBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);

    // Create breadcrumb items
    const breadcrumbItems = [
      <Link
        key="home"
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Explore
      </Link>,
    ];

    pathnames.forEach((value, index) => {
      const to = `/${pathnames.slice(0, index + 1).join("/")}`;
      const formattedValue = value.charAt(0).toUpperCase() + value.slice(1);

      breadcrumbItems.push(
        <Link
          key={to}
          to={to}
          style={{
            color: "inherit",
            textDecoration: "none",
          }}
        >
          {formattedValue}
        </Link>
      );
    });

    return breadcrumbItems;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          backgroundColor: "background.default",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{
              py: 2,
            }}
          >
            {getBreadcrumbs()}
          </Breadcrumbs>
        </Container>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: "1",
          overflowY: "scroll",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
