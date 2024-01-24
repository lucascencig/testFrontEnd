import { Inter, Island_Moments } from "next/font/google";
import {
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import PokemonCard from "@/components/PokemonCard";


const PokemonList = ({ pokemon, handleViewPokemon }) => (
  <SimpleGrid spacing="5" columns={{ base: 1, md: 3, lg: 5 }}>
    {pokemon.map((pokemon) => (
      <Box
        as="button"
        key={pokemon.id}
        onClick={() => handleViewPokemon(pokemon)}
        w={{ base: "240px", md: "200px", lg: "180px" }}
      >
        <PokemonCard pokemon={pokemon} />
      </Box>
    ))}
  </SimpleGrid>
);

export default PokemonList