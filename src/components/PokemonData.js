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



export default function PokemonData({ pokemon }) {

  const [isHovered, setIsHovered] = useState(false);
  const toast = useToast()

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  const getTypeColors = (types) => {
    const typeArray = Array.isArray(types) ? types : [types];

    const colors = typeArray.map((type) => {
      const typeName = type && type.type && type.type.name;

      switch (typeName) {
        case 'normal':
          return '#FED7D7';
        case 'fighting':
          return '#D53F8C';
        case 'flying':
          return '#E9D8FD';
        case 'grass':
          return '#9AE765';
        case 'fire':
          return '#F04029';
        case 'water':
          return '#2974F0';
        case 'poison':
          return '#B385F4';
        case 'ground':
          return '#E9763C';
        case 'rock':
          return '#CAB88A';
        case 'bug':
          return '#A8B71D';
        case 'ghost':
          return '#7A18A2';
        case 'steel':
          return '#5F92A5';
        case 'electric':
          return '#FBD208';
        case 'psychic':
          return '#FF6B79';
        case 'ice':
          return '#91F9F9'
        case 'dragon':
          return '#0887B1';
        case 'dark':
          return '#60596B';
        case 'fairy':
          return '#FB8DEC';
        case 'unknown':
          return '#747474';
        case 'shadow':
          return '#302336'
        default:
          return '#A0AEC0';
      }
    });

    return colors;
  };

  const typeColors = getTypeColors(pokemon.types[0] && pokemon.types[1]);
  console.log(typeColors);

  const [catched, setCatched] = useState(false);
  const [deletePokemon, setDeletePokemon] = useState(false)


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




  const getTypeBackground = (type) => {
    switch (type) {
      // Define los estilos de fondo según el tipo
      case 'grass':
        return 'linear-gradient(to bottom, #9CCF73, #58BB47)';
      case 'fire':
        return 'linear-gradient(to bottom, #FF6E00, #FA5018)';
      case 'water':
        return 'linear-gradient(to bottom, #52B8F6, #2C51DA)';
      case 'bug':
        return 'linear-gradient(to bottom, #31A84E, #1E5E2E)';
      case 'normal':
        return 'linear-gradient(to bottom, #FED7D7, #CB7373)';
      case 'psychic':
        return 'linear-gradient(to bottom, #FF6B79, #FF3649)';
      case 'fighting':
        return 'linear-gradient(to bottom, #D53F8C, #D30E73)';
      case 'ground':
        return 'linear-gradient(to bottom, #E9763C, #742600)';
      case 'rock':
        return 'linear-gradient(to bottom, #CAB88A, #787469)';
      case 'electric':
        return 'linear-gradient(to bottom, #FFE462, #FBD208)';
      case 'poison':
        return 'linear-gradient(to bottom, #B385F4, #8636F7)';
      case 'flying':
        return 'linear-gradient(to bottom, #F1EAF9, #E9D8FD)';
      case 'ghost':
        return 'linear-gradient(to bottom, #7A18A2, #250033)';
      case 'steel':
        return 'linear-gradient(to bottom, #80C0D8, #04668A)';
      case 'ice':
        return 'linear-gradient(to bottom, #E6F9F9, #91F9F9)';
      case 'dragon':
        return 'linear-gradient(to bottom, #C7AB37, #716223)';
      case 'dark':
        return 'linear-gradient(to bottom, #60596B, #201E24)';
      case 'fairy':
        return 'linear-gradient(to bottom, #FB8DEC, #F210D4)';
      case 'unknown':
        return 'linear-gradient(to bottom, #747474, #000000)';
      case 'shadow':
        return 'linear-gradient(to bottom, #302336, #2B0B3A)';


      // Agrega más tipos según tus necesidades
      default:
        return 'linear-gradient(to bottom, #A0AEC0, #5B6477)';
    }
  };

  const cardStyle = {
    background: getTypeBackground(pokemon.types[0].type.name)
  };


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
        <Image
          objectFit="cover"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
          alt={`${pokemon.name}`}
          h="auto"
          transform="scale(1.2)"

          transition="transform 0.3s ease-in-out"
          borderRadius="lg"
          mt="-50px"

          position="relative"
          bottom="10"
        />

        <Box m="auto" top="" right="5" zIndex="99">
          <Checkbox
            colorScheme='green'
            isChecked={catched}
            onChange={handleCathPokemon}
            fontWeight="600"
          >
            {catched ? 'Catched!' : 'Catch'}
          </Checkbox>
        </Box>
        <Box transition="transform 0.7s ease-in-out"

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
