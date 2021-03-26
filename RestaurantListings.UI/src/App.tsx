import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import styled from "@emotion/styled";

import { Navbar } from "./components/Navbar";
import { NavbarLink } from "./components/NavbarLink";
import { Stack } from "./components/Stack";

import { useAuthContext } from "./auth/authContext";
import { AuthRoot } from "./auth/AuthRoot";

const Restaurants = React.lazy(() => import("./pages/Restaurants"));

const LoadingPlaceholder = styled.div({
  fontSize: "1.25rem",
  padding: "2em",
  fontWeight: 700,
  fontStyle: "italic",
  borderRadius: "0.5em",
  textAlign: "center",
  display: "block",
  margin: "0 auto",
});

function App() {
  const { isAuthenticated } = useAuthContext();

  return (
    <>
      <Navbar>
        <NavbarLink to="/">RestaurantListings</NavbarLink>

        <Stack>
          <NavbarLink to="/auth/register">Register</NavbarLink>
          {isAuthenticated ? (
            <NavbarLink to="/auth/logout">Logout</NavbarLink>
          ) : (
            <NavbarLink to="/auth/login">Login</NavbarLink>
          )}
        </Stack>
      </Navbar>

      <Routes>
        <Route path="/" element={<Navigate to="/restaurants" />} />
        <Route
          path="/restaurants"
          element={
            <Suspense
              fallback={<LoadingPlaceholder>Loading...</LoadingPlaceholder>}
            >
              <Restaurants />
            </Suspense>
          }
        />
        <Route path="/auth/*" element={<AuthRoot />} />
      </Routes>
    </>
  );
}

export default App;
