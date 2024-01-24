import Head from "next/head";

import { Inter, Island_Moments } from "next/font/google";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Button,
  Flex,
  useDisclosure,
  extendTheme,
  useToast,
} from "@chakra-ui/react";
import { SeoComponent } from "@/components/SeoComponent";
import PokemonList from "@/components/PokemonList";
import fetchPokemonData from '../pages/api/fetchData'
import { ButtonMyPokemons } from "@/components/ButtonMyPokemons";
import { PokemonDataModal } from "@/components/PokemonDataModal";
import { MyPokemonsModal } from "@/components/MyPokemonsModal";
import { ButtonLoadMore } from "@/components/ButtonLoadMore";

const borderRadius = {
  radii: {
    full: '9999px',
  },
}
const theme = extendTheme({ borderRadius })

export default function Home() {
  const apiCatched = `/api/catched`
  const toast = useToast()

  const pokemonDataModal = useDisclosure();
  const myPokemonsModal = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState();
  const [myPokemons, setMyPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20");
  const [offsetCount, setOffsetCount] = useState(0);

  useEffect(() => {
    fetchPokemonData(currentPage, setPokemon, setIsLoading);
  }, [currentPage]);

  async function handleNextPage() {

    let newOffsetCount = offsetCount + 20;
    console.log(newOffsetCount);

    setOffsetCount(newOffsetCount);

    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offsetCount}&limit=20`;
    const result = await axios.get(url);
    const nextpage = result.data.next;
    console.log(nextpage);

    setCurrentPage(nextpage);
  }

  //FUNCION ABRIR MODAL POKEMON SELECCIONADO
  function handleViewPokemon(pokemon) {
    setSelectedPokemon(pokemon);
    pokemonDataModal.onOpen();
  }

  //FUNCION ABRIR MODAL DE POKEMONES CATCHED
  async function openModalMyPokemons() {

    myPokemonsModal.onOpen();
    try {
      const allMyPokemons = await axios.get(apiCatched);
      setMyPokemons(allMyPokemons.data);
    } catch (error) {
      console.error("Erro al obtener los pokemones:", error);
    }
  }

  //FUNCION ELIMINAR POKEMON
  const handleDeletePokemon = async (pokemon) => {
    const apiCatchedId = `/api/catched/${pokemon.id}`

    try {
      await axios.delete(apiCatchedId);

      setMyPokemons((prevPokemons) =>
        prevPokemons.filter((pokemonid) =>
          pokemonid.id !== pokemon.id));

      toast({
        position: 'top',
        title: 'Pokemon released!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    } catch (error) {
      console.error("No se pudo eliminar el pokemon:", error);
    }
  };


  return (
    <div >
      <SeoComponent />
      <Flex className={styles.main} >
        <div className={styles.pokemonlogo} />
        <Container maxW="10xl" w="100%">
          <ButtonMyPokemons onClick={openModalMyPokemons} />
          <Stack p="5" alignItems="center" spacing={{ base: 5, md: 5, lg: 10 }}>
            <PokemonList pokemon={pokemon} handleViewPokemon={handleViewPokemon} />
            < ButtonLoadMore handleNextPage={handleNextPage} isLoading={isLoading} />
          </Stack>
        </Container>
      </Flex>
      <PokemonDataModal isOpen={pokemonDataModal.isOpen} onClose={pokemonDataModal.onClose} selectedPokemon={selectedPokemon} />
      <MyPokemonsModal isOpen={myPokemonsModal.isOpen} onClose={myPokemonsModal.onClose} myPokemons={myPokemons} handleDeletePokemon={handleDeletePokemon} />
    </div>
  );
}
