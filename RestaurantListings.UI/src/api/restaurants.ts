import { Restaurant } from "../interfaces/restaurant";

import { authService } from "../auth/authService";

export async function getRestaurants(): Promise<Restaurant[]> {
  const res = await fetch("/api/Restaurants");
  return await res.json();
}

export async function saveUserRating(restaurantId: number, userRating: number) {
  let response: Response;

  const clientToken = await authService.getAccessToken();

  if (!clientToken) {
    console.log("Redirect to login page");
  }

  response = await fetch(`/api/Restaurants/${restaurantId}/RateRestaurant`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + clientToken,
    },
    body: JSON.stringify({ userRating }),
  });

  if (response.ok) {
    console.log(response);
    return (await response.json()) as Restaurant;
  } else if (response.status === 401) {
    console.log("Redirect to login page");
  }

  throw response;
}
