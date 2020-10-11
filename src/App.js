import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import styled from "styled-components";

import { Header, PokemonCard, PokemonInfo, Button } from "./components";

import "./App.css";

const POKEMONS_COUNT_BY_ONE_FETCH = 12;

export const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [separatePokemon, setSeparatePokemon] = useState({});
  const [loadCount, setLoadCount] = useState(1);
  const [fetchPokemonsUrl, setFetchPokemonsUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon/?limit=${POKEMONS_COUNT_BY_ONE_FETCH}`
  );

  const onPokemonClick = (pokemon) => {
    setSeparatePokemon(pokemon);
  };

  const onLoadMoreClick = () => {
    setLoadCount(loadCount + 1);
  };

  useEffect(() => {
    const getPokemons = async () => {
      const { data: pokemonsList } = await axios.get(fetchPokemonsUrl);

      pokemonsList.results.forEach(async (elem) => {
        let { data: pokemon } = await axios.get(elem.url);

        setPokemons((state) => {
          return [...state, pokemon];
        });
      });

      setFetchPokemonsUrl(pokemonsList.next);
    };

    getPokemons();
  }, [loadCount]);

  const renderPokemonsList = pokemons.map((elem) => (
    <PokemonCard
      pokemonData={elem}
      onPokemonClick={onPokemonClick.bind(null, elem)}
      key={elem.id}
    />
  ));

  return (
    <Container>
      <Header />
      {!!pokemons.length &&
        pokemons.length >= POKEMONS_COUNT_BY_ONE_FETCH && (
          <Fragment>
            <ContentWrapper>
              <PokemonsContainer>{renderPokemonsList}</PokemonsContainer>
              {!!Object.keys(separatePokemon).length && (
                <PokemonInfo
                  pokemonData={separatePokemon}
                  onPokemonClick={onPokemonClick.bind(null, {})}
                />
              )}
            </ContentWrapper>
            <ButtonContainer>
              <Button text="Load more" onClick={onLoadMoreClick} />
            </ButtonContainer>
          </Fragment>
        )}
    </Container>
  );
};

const Container = styled.div`
  background: linear-gradient(to right, red, blue);
  min-height: 100vh;
  padding-bottom: 100px;
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

const ButtonContainer = styled.div`
  width: 50%;
  margin-left: 5%;
  min-width: 600px;
`;
