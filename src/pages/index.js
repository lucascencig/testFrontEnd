import Head from "next/head";

import { Inter, Island_Moments } from "next/font/google";
import styles from "../styles/Home.module.css";
import axios from "axios";

import { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Input,
  Button,
  SimpleGrid,
  Flex,
  Box,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  Center,
  Image,
  Text,
  extendTheme,
  useToast,
} from "@chakra-ui/react";
import { SeoComponent } from "@/components/SeoComponent";
import PokemonCard from "@/components/PokemonCard";
import PokemonData from "@/components/PokemonData";
import PokemonList from "@/components/PokemonList";
import fetchPokemonData from '../pages/api/fetchData'
import { ButtonMyPokemons } from "@/components/ButtonMyPokemons";
import { PokemonDataModal } from "@/components/PokemonDataModal";
import { MyPokemonsModal } from "@/components/MyPokemonsModal";


const borderRadius = {
  radii: {
    full: '9999px',
  },
}

const theme = extendTheme({ borderRadius })

export default function Home() {
  const pokemonDataModal = useDisclosure();
  const myPokemonsModal = useDisclosure();
  const toast = useToast()

  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState();
  const [myPokemons, setMyPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0"
  );
  const [offsetCount, setOffsetCount] = useState(20)

  useEffect(() => {
    fetchPokemonData(currentPage, setPokemon, setIsLoading);
  }, [currentPage]);

  async function handleNextPage() {

    const newOffsetCount = offsetCount + 20;


    setOffsetCount(newOffsetCount);

    const url = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${newOffsetCount}`;
    const result = await axios.get(url);
    const nextpage = result.data.next;

    console.log(newOffsetCount);
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
      const allMyPokemons = await axios.get(`/api/catched`);
      setMyPokemons(allMyPokemons.data);
    } catch (error) {
      console.error("Erro al obtener los pokemones:", error);
    }
  }

  //FUNCION ELIMINAR POKEMON
  const handleDeletePokemon = async (pokemon) => {
    try {
      await axios.delete(`/api/catched/${pokemon.id}`);

      setMyPokemons((prevPokemons) =>
        prevPokemons.filter((pokemonid) => pokemonid.id !== pokemon.id));

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

            <Button
              border="2px"
              borderColor="cyan.300"
              bg="Cyan.200"
              className={styles.btnLoadMore}
              isLoading={isLoading}
              onClick={handleNextPage}
            >
              Load more
            </Button>
          </Stack>
        </Container>
      </Flex>


      <PokemonDataModal isOpen={pokemonDataModal.isOpen} onClose={pokemonDataModal.onClose} selectedPokemon={selectedPokemon} />


      <MyPokemonsModal isOpen={myPokemonsModal.isOpen} onClose={myPokemonsModal.onClose} myPokemons={myPokemons} handleDeletePokemon={handleDeletePokemon} />



    </div>
  );
}
