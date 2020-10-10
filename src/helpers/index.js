import { PokemonAPI } from "../services/api/api";

export const getPokemons = () => {
  let pokemons;

  const getPokemonsData = async () => {
    const pol = await PokemonAPI.get("/pokemon/?limit=12");

    pokemons = pol;
  };

  getPokemonsData();

  return pokemons;
};
