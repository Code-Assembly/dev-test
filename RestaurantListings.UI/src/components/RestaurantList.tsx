import React from "react";

import { Restaurant } from "../interfaces/restaurant";
import { RestaurantItem } from "./RestaurantItem";

export interface RestaurantListProps {
  restaurants?: Restaurant[];
}

export function RestaurantList(props: RestaurantListProps) {
  const { restaurants = [] } = props;

  console.log(restaurants);

  return (
    <div>
      {restaurants.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}
