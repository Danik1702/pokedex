import React from "react";
import styled from "styled-components";

import crossIcon from '../../assets/icons/cross.png';

export const PokemonInfo = ({ pokemonData, onPokemonClick }) => {
  const renderPokemonAbilities = pokemonData.stats.map((elem, id) => (
    <AbilityContainer key={id}>
      <AbilityTitle>{elem.stat.name}</AbilityTitle>
      <AbilityValue>{elem.base_stat}</AbilityValue>
    </AbilityContainer>
  ));

  return (
    <Container>
      <PokemonImage src={pokemonData.sprites.front_default} />
      <PokemonName>
        {pokemonData.name} #
        {pokemonData.id < 10 ? "00" + pokemonData.id : "0" + pokemonData.id}
      </PokemonName>
      <AbilityContainer>
        <AbilityTitle>Type</AbilityTitle>
        <AbilityValue>
          {pokemonData.types.map((e) => e.type.name).join("/")}
        </AbilityValue>
      </AbilityContainer>
      {renderPokemonAbilities}
      <AbilityContainer>
        <AbilityTitle>Weight</AbilityTitle>
        <AbilityValue>{pokemonData.weight}</AbilityValue>
      </AbilityContainer>
      <AbilityContainer>
        <AbilityTitle>Total moves</AbilityTitle>
        <AbilityValue>{pokemonData.moves.length}</AbilityValue>
      </AbilityContainer>
      <CrossIcon src={crossIcon} onClick={onPokemonClick} />
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  text-align: center;
  width: 30%;
  top: 50px;
  right: 5%;
  border-radius: 10px;
  background-color: #999966;
  box-sizing: border-box;
  padding: 20px 20px 30px 20px;
  border: 4px solid #4d4d33;
`;

const PokemonImage = styled.img`
  border-top-radius: 10px;
`;

const PokemonName = styled.p`
  font-size: 20px;
  font-weight: bold;
  text-transform: capitalize;
`;

const AbilityContainer = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #666666;
  height: 50px;
`;

const AbilityTitle = styled.p`
  width: 150px;
  font-size: 18px;
  text-transform: capitalize;
`;

const AbilityValue = styled(AbilityTitle)`
  width: 100px;
`;

const CrossIcon = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
