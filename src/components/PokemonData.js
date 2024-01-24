import {
  Box,
  AspectRatio,
  Image,
  Stack,
  SimpleGrid,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Progress,
  Text,
  Tab,
  Badge,
  HStack,
  Checkbox,
  Flex,
  Center,
  CheckboxGroup,
  AlertIcon,
  Alert,
  Wrap,
  WrapItem,
  Button,
  Grid
} from "@chakra-ui/react";

import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import { getTypeColors } from "@/pages/api/typesColors";
import { getTypeBackground } from '@/pages/api/typesBackground'
import PokemonImage from "./PokemonImagen";
import CheckboxToggle from "./CheckboxToggle"


export default function PokemonData({ pokemon }) {

  const [catched, setCatched] = useState(false);
  const [deletePokemon, setDeletePokemon] = useState(false)
  const [isHovered, setIsHovered] = useState(false);
  const toast = useToast()

  const handleHover = () => {
    setIsHovered(!isHovered);
  };



  const typeColors = getTypeColors(pokemon.types[0] && pokemon.types[1]);

  const cardStyle = {
    background: getTypeBackground(pokemon.types[0].type.name),
  };

  const handleCathPokemon = async () => {
    try {
      setCatched(!catched);

      if (catched === false) {
        await axios.post(`/api/catched?pokemonId=${pokemon.id}`, {
          id: pokemon.id,
          name: pokemon.name,
        });
        window.localStorage.setItem('catched', pokemon.id);

        if (window.localStorage.getItem('catched', pokemon.id === pokemon.id)) {

          return (
            toast({
              position: 'top',
              title: 'Catched!',
              status: 'success',
              duration: 2000,
              isClosable: true,
            })
          )
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(pokemon.id)




  return (
    <Stack
      spacing="5"
      pb="5"
      w="auto"
      m="1"
      borderRadius="2xl"
      p="2"
    >
      <Stack
        className={styles.bgpokeball}
        borderRadius="lg"
        style={cardStyle}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        mt="50px"
      >
        <PokemonImage id={pokemon.id} name={pokemon.name} />

        <CheckboxToggle
          isChecked={catched}
          onChange={handleCathPokemon}
          label={catched ? 'Catched!' : 'Catch'}
        />
        <Box
          transition="transform 0.7s ease-in-out"
          borderRadius="xl">
          <Center>
            <Stack
              direction="row"
              spacing="3"
              textAlign="center"
              className={styles.modalBody}
            >
              <Grid
                spacing="5"
                p="5"
                w="150px"
                h="150px"
                m="auto"
                templateColumns={{ base: '1fr', }}
                borderRadius="xl"
              >
                <Text fontSize="lg" fontWeight="bold">
                  Weight
                </Text>
                <Text fontWeight="bold" fontSize="lg">{pokemon.weight}</Text>
                <Text fontSize="lg" fontWeight="bold">
                  Height
                </Text>
                <Text fontWeight="bold" fontSize="lg">{pokemon.height}</Text>
              </Grid>

              <Grid
                spacing="5"
                p="5"
                w="150px"
                h="150px"
                m="auto"
                templateColumns={{ base: '1fr', }}
                borderRadius="xl"

              >
                <Text fontSize="lg" fontWeight="bold">
                  Movements
                </Text>
                <Text fontWeight="bold" fontSize="lg">{pokemon.moves.length}</Text>
                <Center>
                  <Text fontSize="lg" fontWeight="bold">
                    Types
                  </Text>
                </Center>
                <Box>
                  {getTypeColors(pokemon.types).map((color, index) => (
                    <Badge
                      key={index}
                      fontWeight="bold"
                      bg={color}
                      m={{ base: '1', md: '1' }}
                    >
                      {pokemon.types[index].type.name}
                    </Badge>
                  ))}
                </Box>
              </Grid>
            </Stack>
          </Center>

          <Stack>
            <Stack
              spacing="5"
              p="5"
              borderRadius="xl"
              className={styles.data}
              w={{ base: '90%', md: "full", lg: "full" }}
              m="auto"
            >
              <Stack>
                <Text fontSize="xl" fontWeight="bold" textTransform="capitalize">
                  hp
                </Text>
                <Progress
                  bg="gray.300"
                  borderRadius="full"
                  value={pokemon.stats[0].base_stat}
                />
              </Stack>
              <Stack>
                <Text fontSize="xl" fontWeight="bold" textTransform="capitalize">
                  attack
                </Text>
                <Progress
                  bg="gray.300"
                  borderRadius="full"
                  value={pokemon.stats[1].base_stat}
                />
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}
