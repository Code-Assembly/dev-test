import { Restaurant } from "../interfaces/restaurant";

export interface RestaurantItemProps {
  restaurant: Restaurant;
}

export function RestaurantItem(props: RestaurantItemProps) {
  const { restaurant } = props;
  return (
    <article>
      <header>
        <img
          className="photo-img"
          width="100px"
          height="100px"
          src={restaurant.photoUri}
        />
        <div>
          <h1>{restaurant.name}</h1>
          <address>{restaurant.address}</address>
          <address>
            <a href={"tel:" + restaurant.phoneNumber} rel="nofollow">
              {restaurant.phoneNumber}
            </a>
          </address>
        </div>
      </header>

      <div>{restaurant.description}</div>
    </article>
  );
}
