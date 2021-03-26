import React from "react";

import { Restaurant } from "../interfaces/restaurant";
import { RestaurantItem } from "./RestaurantItem";
import styled from "@emotion/styled";

export interface RestaurantListProps {
  restaurants?: Restaurant[];
}

const Main = styled.main`
  flex: 1 1 auto;
  
  & > * {
    margin-bottom: 1.5rem;
  }
`;

const EmptyList = styled.div({
  fontSize: 14,
  padding: "2em",
  borderRadius: "0.5em",
  textAlign: "center",
  maxWidth: "65ch",
  margin: "0 auto",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  h1: {
    fontSize: "1.25rem",
    margin: "0 0 0.25rem 0",
    color: "rgb(17, 24, 39)",
  },
  p: {
    margin: 0,
    color: "rgb(107, 114, 128)",
  },
});

export function RestaurantList(props: RestaurantListProps) {
  const { restaurants = [] } = props;

  return (
    <Main>
      {restaurants.length ? (
        restaurants.map((restaurant) => (
          <RestaurantItem key={restaurant.id} restaurant={restaurant} />
        ))
      ) : (
        <EmptyList>
          <h1>We couldn't find any resturants that meet your criteria</h1>
          <p>Try removing some filters to see more options</p>
        </EmptyList>
      )}
    </Main>
  );
}
