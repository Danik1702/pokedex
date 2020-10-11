import React from "react";
import styled from "styled-components";

import { pokemonTypes } from "../../helpers";

export const Select = ({ onSelect }) => {
  const renderOptions = Object.keys(pokemonTypes).map((elem, id) => (
    <Option value={elem} key={id}>
      {elem}
    </Option>
  ));

  return (
    <SelectContainer onChange={(e) => onSelect(e.target.value)}>
      <Option value="All">All</Option>
      {renderOptions}
    </SelectContainer>
  );
};

const SelectContainer = styled.select`
  width: 100%;
  box-sizing: border-box;
  font-size: 18px;
  height: 40px;
`;

const Option = styled.option``;
