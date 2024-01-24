import { Image } from "@chakra-ui/react";

const PokemonImage = ({ id, name }) => (
  <Image
    objectFit="cover"
    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
    alt={name}
    h="auto"
    transform="scale(1.2)"
    transition="transform 0.3s ease-in-out"
    borderRadius="lg"
    mt="-50px"
    position="relative"
    bottom="10"
  />
);

export default PokemonImage;