import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import styled from "styled-components";

import { Header, PokemonCard, PokemonInfo, Button, Select } from "./components";

import "./App.css";

const POKEMONS_COUNT_BY_ONE_FETCH = 12;

export const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [separatePokemon, setSeparatePokemon] = useState({});
  const [loadCount, setLoadCount] = useState(1);
  const [fetchPokemonsUrl, setFetchPokemonsUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon/?limit=${POKEMONS_COUNT_BY_ONE_FETCH}`
  );
  const [filteredPokemons, setFilteredPokemons] = useState(null);

  const onPokemonClick = (pokemon) => {
    setSeparatePokemon(pokemon);
  };

  const onLoadMoreClick = () => {
    setLoadCount(loadCount + 1);
  };

  const onSelectChange = (type) => {
    if (type === "All") {
      setFilteredPokemons(null);
    } else {
      setFilteredPokemons(
        [...pokemons].filter(
          (elem) =>
            !!elem.types.filter(
              (separateType) => separateType.type.name === type
            ).length
        )
      );
    }
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

  const renderFilteredPokemonsList = filteredPokemons && filteredPokemons.map((elem) => (
    <PokemonCard
      pokemonData={elem}
      onPokemonClick={onPokemonClick.bind(null, elem)}
      key={elem.id}
    />
  ));

  const renderPokemonsListContainer = () => {
    if (!renderFilteredPokemonsList) {
      return renderPokemonsList;
    }

    if (renderFilteredPokemonsList.length === 0) {
      return (
        <EmptyFilterText>No results. Please select different filter value</EmptyFilterText>
      );
    }

    return renderFilteredPokemonsList;
  }

  return (
    <Container>
      <Header />
      {!!pokemons.length && pokemons.length >= POKEMONS_COUNT_BY_ONE_FETCH && (
        <Fragment>
          <ButtonContainer>
            <Select onSelect={onSelectChange} />
          </ButtonContainer>
          <ContentWrapper>
            <PokemonsContainer>
              {renderPokemonsListContainer()}
            </PokemonsContainer>
            {!!Object.keys(separatePokemon).length && (
              <PokemonInfo
                pokemonData={separatePokemon}
                onPokemonClick={onPokemonClick.bind(null, {})}
              />
            )}
          </ContentWrapper>
          {!renderFilteredPokemonsList && (
            <ButtonContainer>
              <Button text="Load more" onClick={onLoadMoreClick} />
            </ButtonContainer>
          )}
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

  @media (max-width: 1080px) {
    margin: 0 auto;
    margin-top: 50px;
  }

  @media (max-width: 670px) {
    justify-content: center;
    min-width: 400px;
  }
`;

const ButtonContainer = styled.div`
  width: 50%;
  margin-left: 5%;
  min-width: 600px;

  @media (max-width: 1080px) {
    margin: 0 auto;
  }

  @media (max-width: 670px) {
    display: flex;
    justify-content: center;
    width: 240px;
    min-width: 100px;
  }
`;

const EmptyFilterText = styled.h2`
  text-align: center;
  color: #ffffff;
  font-size: 30px;
`;
