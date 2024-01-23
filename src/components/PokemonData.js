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
  Center
} from "@chakra-ui/react";

import axios from "axios";
import { useEffect, useState } from "react";




export default function PokemonData({ pokemon }) {

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
            <Center fontSize={20} fontWeight="bold" color="Lime">Catched!</Center>
          )
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(pokemon.id)





  return (

    <Stack spacing="5" pb="5" >
      <Stack spacing="5" position="relative" >

        <Box position="" right="0" zIndex="99">
          {
            catched === false ?
              <Center>
                <Checkbox isChecked={catched} onChange={handleCathPokemon}>
                  Catch
                </Checkbox>
              </Center>
              :
              <Center fontSize={20} fontWeight="bold" color="Lime">Catched! </Center>
          }

        </Box>





        <AspectRatio w="full" ratio={1}>
          <Image
            objectFit="contain"
            // {HACER AXIOS PARA OBTENER LA IMAGEN}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
          />
        </AspectRatio>
        <Stack direction="row" spacing="5" >
          <Stack>
            <Text fontSize="sm" fontWeight='bold'>Weight</Text>

            <Text fontWeight='bold'>{pokemon.weight}</Text>
          </Stack>
          <Stack>
            <Text fontSize="sm" fontWeight='bold'>Height</Text>

            <Text fontWeight='bold'>{pokemon.height}</Text>
          </Stack>
          <Stack>
            <Text fontSize="sm" fontWeight='bold'>Movements</Text>

            <Text fontWeight='bold'>{pokemon.moves.length}</Text>
          </Stack>
          <Stack>
            <Text fontSize="sm" fontWeight='bold'>Types</Text>
            <HStack>

              {
                pokemon.types.map((type) => (

                  <Badge
                    colorScheme=''
                    key={type.slot}
                    fontWeight='bold'>
                    {type.type.name}

                  </Badge>
                ))
              }
            </HStack>
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing="5" p="5" bg="gray.100" borderRadius="xl">
        <Stack>
          <Text fontSize="xl" textTransform="capitalize">hp</Text>

          <Progress bg="gray.300" borderRadius="full" value={pokemon.stats[0].base_stat} />
        </Stack>
        <Stack>
          <Text fontSize="xl" textTransform="capitalize">attack</Text>

          <Progress bg="gray.300" borderRadius="full" value={pokemon.stats[1].base_stat} />
        </Stack>

        <Stack>

        </Stack>
      </Stack>
    </Stack >

  );
}
