import axios from "axios";



export const axiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
})