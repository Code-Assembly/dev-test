import { Restaurant } from "../interfaces/restaurant";
import { StarRating } from "./StarRating";
import styled from "@emotion/styled";
import { useAuthContext } from "../auth/authContext";
export interface RestaurantItemProps {
  restaurant: Restaurant;
}

const Resturant = styled.article({
  fontSize: 14,
  overflow: "hidden",
  backgroundColor: "#FFF",
  borderRadius: "0.5em",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  header: {
    padding: "2em 2em 0 2em",
    display: "flex",
    gap: "1.25em",

    h1: {
      fontSize: "1.5rem",
      margin: "0 0 0.125em 0",
    },
  },

  ".photo-img": {
    borderRadius: "0.5rem",
  },

  "p.description": {
    lineHeight: 1.4,
    padding: "1.75em 2em",
    maxWidth: "75ch",
    margin: 0,
  },

  footer: {
    padding: "1.25em 2em",
    borderTop: "1px solid #e5e7eb",
    backgroundColor: "#f9fafc",
  },
});

const Tag = styled.em(
  {
    display: "inline-block",
    padding: "0.25em 1em",
    lineHeight: 1.8,
    fontSize: 10,
    backgroundColor: "#e5e7eb",
    borderRadius: "3px",
    margin: "0 0.52em",
    ":first-of-type": {
      marginLeft: 0,
    },
  },
  (props) => ({ backgroundColor: props.color })
);

const Telephone = styled.a({
  display: "inline-block",
  textDecoration: "none",
  color: "rgb(79, 70, 229)",
});

export function RestaurantItem(props: RestaurantItemProps) {
  const { restaurant } = props;

  const { isAuthenticated } = useAuthContext();

  const rateResturant = async (userRating: number) => {
  };

  return (
    <Resturant>
      <header>
        <img
          className="photo-img"
          width="100px"
          height="100px"
          src={restaurant.photoUri}
        />
        <div>
          <h1>{restaurant.name}</h1>
          <StarRating
            rating={restaurant.rating}
            saveRating={rateResturant}
            disabled={!isAuthenticated}
          />
          <address>{restaurant.address}</address>
          <address>
            <Telephone href={"tel:" + restaurant.phoneNumber} rel="nofollow">
              {restaurant.phoneNumber}
            </Telephone>
          </address>
        </div>
      </header>
      <p className="description">{restaurant.description}</p>
      <footer>
        {restaurant.familyFriendly ? (
          <Tag key="familyFriendly" color="skyblue">
            <b>Family friendly</b>
          </Tag>
        ) : null}
        {restaurant.veganFriendly ? (
          <Tag key="veganFriendly" color="lightgreen">
            <b>Vegan</b>
          </Tag>
        ) : null}
        {restaurant.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </footer>
    </Resturant>
  );
}
