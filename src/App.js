import React, { useState, useEffect } from "react";
import axios from 'axios';

import { Header } from "./components";

import "./App.css";

export const App = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getPokemons = async () => {
      const { data: pokemonsList } = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=12");

      pokemonsList.results.forEach(async elem => {
        let { data: pokemon } = await axios.get(elem.url)

        setPokemons((state) => {
          return [...state, pokemon]
        });
      });
    };

    getPokemons();
  }, []);

  console.log(pokemons);

  return <Header />;
};
