import styled from "@emotion/styled";
import React from "react";

const Star = (props: { fill: string }) => {
  const { fill } = props;

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

const StarRatingIcon = (props: {
  index: number;
  rating: number;
  onMouseEnter: Function;
  onMouseLeave: Function;
  onSaveRating: Function;
}) => {
  const { index, rating = 0, onMouseEnter, onMouseLeave, onSaveRating } = props;
  const fill = rating >= index ? "#FBC02D" : "#FFF";

  return (
    <div
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => onSaveRating(index)}
    >
      <Star fill={fill} />
    </div>
  );
};

const Container = styled.div({
  display: "inline-flex",
  padding: "0.5em 0",
});

const StarContainer = styled.div({
  display: "inline-flex",
  cursor: "pointer",
  "&.disabled": {
    cursor: "default",
  },
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

export function StarRating(props: {
  rating: number;
  saveRating?: (rating: number) => void;
  disabled: boolean;
}) {
  const { rating, saveRating, disabled = false } = props;

  const [userRating, setUserRating] = React.useState(0);

  const onMouseEnter = (index: number) => {
    if (!disabled) {
      setUserRating(index);
    }
  };

  const onMouseLeave = () => {
    if (!disabled) {
      setUserRating(0);
    }
  };

  const onSaveRating = (rating: number) => {
    if (!disabled && saveRating) {
      saveRating(rating);
    }
  };

  const formattedRating =
    userRating ||
    Number.parseFloat((Math.round(rating * 100) / 100).toFixed(1));

  return (
    <Container>
      <RatingAvatar>{formattedRating}</RatingAvatar>
      <StarContainer className={`${disabled ? "disabled" : null}`}>
        {[1, 2, 3, 4, 5].map((s) => (
          <StarRatingIcon
            index={s}
            rating={formattedRating}
            key={s}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onSaveRating={onSaveRating}
          />
        ))}
      </StarContainer>
    </Container>
  );
}
