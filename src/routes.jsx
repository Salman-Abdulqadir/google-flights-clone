import React from "react";
import { Routes, Route } from "react-router";
import { createBrowserRouter } from "react-router";

//pages
import HomePage from "./pages/Home";
import Flights from "./pages/Flights";
import FlightDetailsPage from "./pages/FlightDetails";
import NotFoundPage from "./pages/404";
import AppLayout from "./layouts/AppLayout";

export const paths = {
  home: "/",
  flightDetails: "/flights/:id",
  flights: "/flights",
};

const routes = [
  { path: paths.home, element: HomePage },
  { path: paths.flightDetails, element: FlightDetailsPage },
  { path: paths.flights, element: Flights },
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
