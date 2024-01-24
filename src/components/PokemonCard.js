import {
  Stack,
  Text,
  Image,
  HStack,
  Badge,
  AspectRatio,
} from "@chakra-ui/react";
import { getTypeColors } from "@/pages/api/typesColors";
import { getTypeBackground } from "@/pages/api/typesBackground";
import styles from '../styles/Home.module.css'

export default function PokemonCard({ pokemon }) {

  const cardStyle = {
    background: getTypeBackground(pokemon.types[0].type.name),
  };

  return (
    <Stack
      spacing="5"
      boxShadow="xl"
      p="5"
      borderRadius="2xl"
      alignItems="center"
      style={cardStyle}
      className={styles.card}
    >
      <AspectRatio w="full" ratio={1}>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
          alt={`${pokemon.name}`}
        />
      </AspectRatio>
      <Text textAlign="center" textTransform="capitalize" fontWeight="bold" className={styles.description}>
        {pokemon.name}
      </Text>
      <HStack>
        {getTypeColors(pokemon.types).map((color, index) => (
          <Badge
            colorScheme=""
            key={index}
            fontWeight="bold"
            bg={color}
          >
            {pokemon.types[index].type.name}
          </Badge>
        ))}
      </HStack>
    </Stack>
  );
}
