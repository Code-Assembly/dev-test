import styled from "@emotion/styled";

export const Container = styled.div({
  margin: "0 auto",
  maxWidth: "1140px",
  padding: "0 1rem",
  display: "flex",
  flexDirection: "row",
  gap: "2rem",

  '@media (max-width: 720px)':{
    flexDirection: 'column'
  }
});
