import Head from "next/head";

import { Inter, Island_Moments } from "next/font/google";

import axios from "axios";



const fetchPokemonData = async (currentPage, setPokemon, setIsLoading) => {
  setIsLoading(true);
  try {
    const { data } = await axios.get(currentPage);
    const promises = data.results.map((result) => axios(result.url));
    const fetchedPokemon = (await Promise.all(promises)).map(
      (res) => res.data
    );
    setPokemon((prev) => [...prev, ...fetchedPokemon]);
  } catch (error) {
    console.error("Error al obtener datos de Pokemon:", error);
  } finally {
    setIsLoading(false);
  }
};

export default fetchPokemonData;