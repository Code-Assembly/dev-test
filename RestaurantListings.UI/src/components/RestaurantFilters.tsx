import React, { useReducer, Reducer, useEffect } from "react";
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

const FilterGroup = styled.div({
  marginBottom: "1rem",
});

const FilterTitle = styled.h4({
  marginBottom: "1rem",
  fontSize: "1.1rem",
  fontWeight: 500,
  color: "#2c2c2c",
});

export function RestaurantFilters(props: RestaurantFiltersProps) {
  const { tags = [], onChange } = props;
  const [state, dispatch] = useReducer(restaurantFiltersReducer, {
    tags: [],
    isFamilyFriendly: false,
    isVeganFriendly: false,
  });

  useEffect(() => {
    onChange?.(state);
  }, [state, onChange]);

  return (
    <div style={{ flex: "1 0 250px" }}>
      <FilterGroup>
        <FilterTitle>Tags</FilterTitle>

        {tags.map((tag) => (
          <ToggleFilter
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
    </div>
  );
}
