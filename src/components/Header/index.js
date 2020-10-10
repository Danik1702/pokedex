import React from "react";
import styled from "styled-components";

export const Header = () => {
  return (
      <HeaderWrapper>
          <HeaderText>Pokedex</HeaderText>
      </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const HeaderText = styled.h2`
  font-size: 50px;
  font-family: monospace;
`;
