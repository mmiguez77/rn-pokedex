import { axiosInstance } from "../config/api/axiosInstance";
import type { Pokemon } from "../domain/entities/Pokemon";
import type { PokeAPIPaginatedResponse, PokeAPIPokemon } from "../infrastructure/interfaces/pokeapi.interfaces";


export const getPokemons = async (page: number, limit: number = 20):Promise<Pokemon[]> => {

  try {
    
    const url = `/pokemon?offset=${page * 10}&limit=${limit}`;
    const { data } = await axiosInstance.get<PokeAPIPaginatedResponse>(url);

    const pokemonPromises = data.results.map( (result) => {
      return axiosInstance.get<PokeAPIPokemon>(result.url);
    });

    const pokemons = await Promise.all(pokemonPromises);

    return [];

  } catch (error) {
    throw new Error("Error getting pokemons");
    
  }

}