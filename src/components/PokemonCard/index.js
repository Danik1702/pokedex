import React from "react";
import styled from "styled-components";

import { pokemonTypes } from "../../helpers";

export const PokemonCard = ({ pokemonData, onPokemonClick }) => {
  const renderPokemonTypes = pokemonData.types.map((elem) => (
    <PokemonType key={elem.slot} color={pokemonTypes[elem.type.name]}>
      {elem.type.name}
    </PokemonType>
  ));

  return (
    <Container onClick={onPokemonClick}>
      <PokemonImage src={pokemonData.sprites.front_default} />
      <PokemonName>{pokemonData.name}</PokemonName>
      <PokemonTypesContainer>{renderPokemonTypes}</PokemonTypesContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 30%;
  margin-bottom: 30px;
  text-align: center;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  background-color: #999966;
  cursor: pointer;
  border: 2px solid #4d4d33;
  transition-duration: 1s;

  &:nth-of-type(3n-1) {
    margin: 0 5% 30px 5%;
  }

  &:hover {
    box-shadow: 0 0 10px 10px #ffffff;
  }
`;

const PokemonImage = styled.img`
  border-top-radius: 10px;
`;

const PokemonName = styled.p`
  text-align: center;
  font-size: 20px;
  text-transform: capitalize;
  font-weight: bold;
  letter-spacing: 2px;
`;

const PokemonTypesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const PokemonType = styled.div`
  width: 48%;
  border-radius: 5px;
  background-color: ${(props) => props.color};
  padding: 10px 0;
  font-size: 18px;

  &:nth-of-type(even) {
    margin-left: 4%;
  }
`;
