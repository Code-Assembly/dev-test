import React, { useCallback, useEffect, useState } from "react";

import { getRestaurants } from "../api/restaurants";
import { Container } from "../components/Container";
import { RestaurantList } from "../components/RestaurantList";
import {
  RestaurantFilters,
  RestaurantFiltersState,
} from "../components/RestaurantFilters";
import { Restaurant } from "../interfaces/restaurant";

export default function Restaurants() {
  const [tags, setTags] = useState<string[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );

  useEffect(() => {
    async function fetchRestaurants() {
      const restaurants = await getRestaurants();
      setRestaurants(restaurants);
      setFilteredRestaurants(restaurants);

      const uniqueTags = new Set(restaurants.flatMap((r) => r.tags));
      const sortedTags = Array.from(uniqueTags).sort();
      setTags(sortedTags);
    }

    fetchRestaurants();
  }, []);

  const handleFiltersChange = useCallback(
    (value: RestaurantFiltersState) => {
      let nextRestaurants = restaurants;

      if (value.tags.length) {
        nextRestaurants = nextRestaurants.filter((restaurant) =>

        // Note: every or some can be used below
        // every : choose resturants with all selected tags (inclusive)
        // some: choose resturants with some matching tags (intersecting)

          value.tags.every((resturantTag) =>
            restaurant.tags.includes(resturantTag)
          )
        );
      }

      if (value.isFamilyFriendly) {
        nextRestaurants = nextRestaurants.filter((r) => r.familyFriendly);
      }

      if (value.isVeganFriendly) {
        nextRestaurants = nextRestaurants.filter((r) => r.veganFriendly);
      }

      setFilteredRestaurants(nextRestaurants);
    },
    [restaurants]
  );

  return (
    <Container>
      <RestaurantFilters tags={tags} onChange={handleFiltersChange} />
      <RestaurantList restaurants={filteredRestaurants} />
    </Container>
  );
}
