import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import { Header, PokemonCard, PokemonInfo } from "./components";

import "./App.css";

const POKEMONS_COUNT_BY_ONE_FETCH = 12;

export const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [separatePokemon, setSeparatePokemon] = useState({});

  const onPokemonClick = (pokemon) => {
    console.log(pokemon);
    setSeparatePokemon(pokemon);
  }

  useEffect(() => {
    const getPokemons = async () => {
      const { data: pokemonsList } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=${POKEMONS_COUNT_BY_ONE_FETCH}`
      );

      pokemonsList.results.forEach(async (elem) => {
        let { data: pokemon } = await axios.get(elem.url);

        setPokemons((state) => {
          return [...state, pokemon];
        });
      });
    };

    getPokemons();
  }, []);

  const renderPokemonsList = pokemons.map((elem) => (
    <PokemonCard pokemonData={elem} onPokemonClick={onPokemonClick.bind(null, elem)} key={elem.id} />
  ));

  return (
    <Container>
      <Header />
      {!!pokemons.length &&
        pokemons.length % POKEMONS_COUNT_BY_ONE_FETCH === 0 && (
          <ContentWrapper>
            <PokemonsContainer>{renderPokemonsList}</PokemonsContainer>
            {!!Object.keys(separatePokemon).length && (
              <PokemonInfo pokemonData={separatePokemon} onPokemonClick={onPokemonClick.bind(null, {})} />
            )}
          </ContentWrapper>
        )}
    </Container>
  );
};

const Container = styled.div`
  background: linear-gradient(to right, red, blue);
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const PokemonsContainer = styled.div`
  margin-top: 50px;
  width: 50%;
  min-width: 600px;
  margin-left: 5%;
  display: flex;
  flex-wrap: wrap;
`;
