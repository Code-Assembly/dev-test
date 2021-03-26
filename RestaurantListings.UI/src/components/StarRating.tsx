import styled from "@emotion/styled";
import React from "react";

const Star = (props: { index: number; rating: number }) => {
  const { index, rating } = props;

  const fill = rating >= index ? "#FBC02D" : "#FFF";

  return (
    <svg
      width="22"
      height="22"
      viewBox="-3 -3 28 28"
      fill={fill}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="star"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );
};

const RatingContainer = styled.div({
  display: "inline-flex",
  padding: "0.5em 0",
});

const RatingAvatar = styled.em({
  display: "inline-block",
  width: "24px",
  textAlign: "center",
  fontSize: "10px",
  fontWeight: 700,
  lineHeight: "24px",
  borderRadius: "50%",
  backgroundColor: "#FBC02D",
  marginRight: "1em",
});

export function StarRating(props: { rating: number }) {
  const { rating } = props;

  const formattedRating = Number.parseFloat(
    (Math.round(rating * 100) / 100).toFixed(1)
  );

  return (
    <RatingContainer>
      <RatingAvatar>{formattedRating}</RatingAvatar>

      {[1, 2, 3, 4, 5].map((s) => (
        <Star index={s} rating={formattedRating} key={s} />
      ))}
    </RatingContainer>
  );
}
