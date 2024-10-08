import { axiosInstance } from "../config/api/axiosInstance";
import type { Pokemon } from "../domain/entities/Pokemon";
import type { PokeAPIPaginatedResponse, PokeAPIPokemon } from "../infrastructure/interfaces/pokeapi.interfaces";
import { PokemonMapper } from "../infrastructure/mappers/pokemon.mapper";


export const getPokemons = async (page: number, limit: number = 20):Promise<Pokemon[]> => {

  try {
    
    const url = `/pokemon?offset=${page * 10}&limit=${limit}`;
    const { data } = await axiosInstance.get<PokeAPIPaginatedResponse>(url);

    const pokemonPromises = data.results.map( (result) => {
      return axiosInstance.get<PokeAPIPokemon>(result.url);
    });

    const PokeAPIPokemons = await Promise.all(pokemonPromises);
    const pokemonsPromises = PokeAPIPokemons.map( (pokemon) => PokemonMapper.pokeApiPokemonToEntity(pokemon.data) );

    return await Promise.all(pokemonsPromises);

  } catch (error) {
    throw new Error("Error getting pokemons");
    
  }

}