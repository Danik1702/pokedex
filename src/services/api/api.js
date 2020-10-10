import axios from "axios";

export const PokemonAPI = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export const ImagesAPI = axios.create({
  baseURL: "https://pokeapi.co/media/",
});

export class API {
  constructor() {
    this.baseURL = 'https://pokeapi.co/api/v2/';
  }

  getPokemons() {
    
  }
}