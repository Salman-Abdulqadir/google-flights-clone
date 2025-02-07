import React from "react";
import { Routes, Route } from "react-router";

//pages
import HomePage from "./pages/Home";
import SearchFlightsPage from "./pages/SearchFlights";
import FlightDetailsPage from "./pages/FlightDetails";
import NotFoundPage from "./pages/404";
import AppLayout from "./layout/AppLayout";

export const paths = {
  home: "/",
  searchFlights: "/flights/search/*",
  flightDetails: "/flights/:id",
};

const routes = [
  { path: paths.home, element: HomePage },
  { path: paths.searchFlights, element: SearchFlightsPage },
  { path: paths.flightDetails, element: FlightDetailsPage },
  { path: "/*", element: NotFoundPage },
];

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map(({ path, element: Page }, index) => (
        <Route
          key={index}
          path={path}
          element={
            <AppLayout>
              <Page />
            </AppLayout>
          }
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;
