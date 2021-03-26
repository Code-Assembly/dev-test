import { Restaurant } from "../interfaces/restaurant";

export async function getRestaurants(): Promise<Restaurant[]> {
  const res = await fetch("/api/restaurants");
  return await res.json();
}

// Naive and simplistic implementation would use tokens or cookies to get the user session to save the rating 
// no need to pass in the userId endpoint would need to ensure user is also logged in

export async function saveUserRating(userRatingPayload: {
  userId: any;
  restaurantId: any;
  rating: number;
}): Promise<Restaurant[]> {
  const res = await fetch("/api/restaurant/setUserRating", {
    method: "POST",
    body: JSON.stringify(userRatingPayload),
  });
  return await res.json();
}
