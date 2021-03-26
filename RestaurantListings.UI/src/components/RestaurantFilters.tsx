import React, { useReducer, Reducer, useEffect, useState } from "react";
import styled from "@emotion/styled";

import { ToggleFilter } from "./ToggleFilter";

export interface RestaurantFiltersState {
  tags: string[];
  isFamilyFriendly: boolean;
  isVeganFriendly: boolean;
}

type RestaurantFiltersAction =
  | { type: "toggleTag"; payload: { tag: string } }
  | { type: "toggleFamilyFriendly" }
  | { type: "toggleVeganFriendly" };

const restaurantFiltersReducer: Reducer<
  RestaurantFiltersState,
  RestaurantFiltersAction
> = (state, action) => {
  switch (action.type) {
    case "toggleTag": {
      if (state.tags.includes(action.payload.tag)) {
        return {
          ...state,
          tags: state.tags.filter((tag) => tag !== action.payload.tag),
        };
      } else {
        return { ...state, tags: [...state.tags, action.payload.tag] };
      }
    }

    case "toggleFamilyFriendly": {
      return { ...state, isFamilyFriendly: !state.isFamilyFriendly };
    }

    case "toggleVeganFriendly": {
      return { ...state, isVeganFriendly: !state.isVeganFriendly };
    }

    default:
      throw Error();
  }
};

export interface RestaurantFiltersProps {
  tags: string[];
  onChange?: (value: RestaurantFiltersState) => unknown;
}

const FiltersContainer = styled.div({
  flex: "0 1 250px",
  minWidth: "140px",

  "> .filterPane": {
    display: "block",
  },

  "@media (max-width: 720px)": {
    backgroundColor: "#f9fafc",
    border: "1px solid #e5e7eb",
    borderRadius: "0.25em",

    overflow: "hidden",
    flex: "none",
  },
});

const Button = styled.button({
  all: "unset",
  display: "none",
  textAlign: "center",
  width: "100%",
  padding: "0.5em 1.25em",
  fontSize: 14,
  fontWeight: 700,
  color: "#f9fafc",
  backgroundColor: "#2c2c2c",
  boxSizing: "border-box",

  "@media (max-width: 720px)": {
    display: "block",
  },
});

const FilterGroup = styled.div({
  marginBottom: "1rem",
});

const FilterPane = styled.div({
  marginBottom: "1rem",
  overflow: "hidden",

  "@media (max-width: 720px)": {
    padding: "1em",
    "&.show": {
      display: "block",
    },

    "&.hide": {
      display: "none",
    },
  },
});

const FilterTitle = styled.h4({
  marginBottom: "1rem",
  fontSize: "1.1rem",
  fontWeight: 500,
  color: "#2c2c2c",
});

export function RestaurantFilters(props: RestaurantFiltersProps) {
  const { tags = [], onChange } = props;
  const [showFilters, setShowFilters] = useState(false);
  const [state, dispatch] = useReducer(restaurantFiltersReducer, {
    tags: [],
    isFamilyFriendly: false,
    isVeganFriendly: false,
  });

  useEffect(() => {
    onChange?.(state);
  }, [state, onChange]);

  return (
    <FiltersContainer>
      <FilterPane className={`filterPane ${showFilters ? "show" : "hide"}`}>
        <FilterGroup>
          <FilterTitle>Tags</FilterTitle>

          {tags.map((tag) => (
            <ToggleFilter
              key={tag}
              label={tag}
              isChecked={!!state.tags.includes(tag)}
              onChange={() => dispatch({ type: "toggleTag", payload: { tag } })}
            />
          ))}
        </FilterGroup>

        <FilterGroup>
          <FilterTitle>Other</FilterTitle>

          <ToggleFilter
            label="Family friendly"
            isChecked={state.isFamilyFriendly}
            onChange={() => dispatch({ type: "toggleFamilyFriendly" })}
          />

          <ToggleFilter
            label="Vegan"
            isChecked={state.isVeganFriendly}
            onChange={() => dispatch({ type: "toggleVeganFriendly" })}
          />
        </FilterGroup>
      </FilterPane>
      <Button onClick={() => setShowFilters((show) => !show)}>
        {showFilters ? "Hide " : "Show "}Filters
      </Button>
    </FiltersContainer>
  );
}
