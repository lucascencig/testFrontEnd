import Head from "next/head";

import { Inter, Island_Moments } from "next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
const inter = Inter({ subsets: ["latin"] });
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
  extendTheme
} from "@chakra-ui/react";
import PokemonCard from "@/components/PokemonCard";
import PokemonData from "@/components/PokemonData";

import { TbPokeball } from "react-icons/tb";



const borderRadius = {
  radii: {
    full: '9999px',
  },
}

const theme = extendTheme({ borderRadius })

export default function Home() {
  const pokemonDataModal = useDisclosure();
  const myPokemonsModal = useDisclosure();


  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState();
  const [myPokemons, setMyPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0"
  );
  const [offsetCount, setOffsetCount] = useState(20)

  useEffect(() => {
    setIsLoading(true);
    axios.get(currentPage).then(async ({ data }) => {
      const promises = data.results.map((result) => axios(result.url));
      const fetchedPokemon = (await Promise.all(promises)).map(
        (res) => res.data
      );
      setPokemon((prev) => [...prev, ...fetchedPokemon]);
      setIsLoading(false);
    });
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
      window.localStorage.removeItem('catched', pokemon.id)
    } catch (error) {
      console.error("No se pudo eliminar el pokemon:", error);
    }
  };
  return (
    <>
      <Head>
        <title>Pokemon Challenge</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2250%22 fill=%22%23e41717%22></rect><path d=%22M26.67 58.50L22.50 58.50L22.50 71.96Q21.70 72.18 20.05 72.39Q18.39 72.61 16.66 72.61L16.66 72.61Q12.85 72.61 11.37 71.31Q9.90 70.02 9.90 66.63L9.90 66.63L9.90 32.50Q9.90 30.99 10.72 30.16Q11.55 29.34 12.99 28.83L12.99 28.83Q15.44 27.97 18.79 27.57Q22.14 27.18 24.87 27.18L24.87 27.18Q34.81 27.18 40.06 31.42Q45.32 35.67 45.32 42.94L45.32 42.94Q45.32 46.47 43.99 49.32Q42.66 52.16 40.24 54.21Q37.83 56.26 34.38 57.38Q30.92 58.50 26.67 58.50L26.67 58.50ZM22.42 48.63L25.88 48.63Q28.90 48.63 30.70 47.16Q32.50 45.68 32.50 42.94L32.50 42.94Q32.50 40.21 30.81 38.73Q29.12 37.26 25.88 37.26L25.88 37.26Q24.73 37.26 23.97 37.29Q23.22 37.33 22.42 37.47L22.42 37.47L22.42 48.63ZM74.77 67.86L64.33 55.69L64.33 71.96Q63.54 72.18 61.88 72.39Q60.22 72.61 58.50 72.61L58.50 72.61Q54.68 72.61 53.20 71.31Q51.73 70.02 51.73 66.63L51.73 66.63L51.73 28.26Q52.59 28.11 54.25 27.86Q55.90 27.61 57.56 27.61L57.56 27.61Q61.16 27.61 62.74 28.83Q64.33 30.06 64.33 33.58L64.33 33.58L64.33 45.25L79.30 27.97Q84.20 27.97 86.32 29.80Q88.45 31.64 88.45 34.16L88.45 34.16Q88.45 36.03 87.51 37.69Q86.58 39.34 84.49 41.43L84.49 41.43L75.49 50.43Q80.17 55.62 83.98 59.65Q87.80 63.68 90.10 66.20L90.10 66.20Q90.10 67.78 89.53 69.01Q88.95 70.23 87.98 71.10Q87.01 71.96 85.78 72.39Q84.56 72.82 83.19 72.82L83.19 72.82Q80.24 72.82 78.37 71.35Q76.50 69.87 74.77 67.86L74.77 67.86Z%22 fill=%22%23f8e71c%22></path></svg>" />
      </Head>

      <Flex alignItems="center" minH="100vh" justifyContent="center">
        <Container maxW="container.lg">
          <Center mt="8">
            <Button as="button" onClick={openModalMyPokemons} pos="fixed" zIndex={99} colorScheme="green" borderRadius="full" fontSize="4xl">
              <TbPokeball />

            </Button>
          </Center>
          <Stack p="5" alignItems="center" spacing="5">

            <SimpleGrid spacing="5" columns={{ base: 1, md: 5 }}>
              {pokemon.map((pokemon) => (
                <Box
                  as="button"
                  key={pokemon.id}
                  onClick={() => handleViewPokemon(pokemon)}
                >
                  <PokemonCard pokemon={pokemon} />
                </Box>
              ))}
            </SimpleGrid>




            <Button isLoading={isLoading} onClick={handleNextPage}>
              Load more
            </Button>

          </Stack>
        </Container>
      </Flex>


      <Modal {...pokemonDataModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textTransform="capitalize">
            {selectedPokemon?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedPokemon && <PokemonData pokemon={selectedPokemon} />}
          </ModalBody>
        </ModalContent>
      </Modal>


      <Modal {...myPokemonsModal}>
        <ModalOverlay />
        <ModalContent>

          <ModalHeader textTransform="capitalize" w='100%'>My Pokemons</ModalHeader>

          <ModalCloseButton />
          <ModalBody >
            <SimpleGrid spacing="5" columns={{ base: 1, md: 5 }}>
              {
                myPokemons.length <= 0 ?
                  <Center w='350px'>
                    <Text fontWeight='600'>
                      You don´t have any pokemon yet!
                    </Text>
                  </Center>
                  :
                  myPokemons.map((pokemon) => (
                    <Box key={pokemon.id} >
                      <Image w={256} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`} />
                      <Center fontSize="lg" fontWeight='600'>{pokemon.name}</Center>
                      <Button w={50} onClick={() => handleDeletePokemon(pokemon)}>X</Button>
                    </Box>
                  ))
              }

            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>



    </>
  );
}
