import {
  Stack,
  Text,
  Image,
  HStack,
  Badge,
  AspectRatio,
} from "@chakra-ui/react";

import styles from '../styles/Home.module.css'

export default function PokemonCard({ pokemon }) {

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
          return '#C7AB37';
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
    background: getTypeBackground(pokemon.types[0].type.name), // Se toma solo el primer tipo, puedes ajustar esto según tus necesidades
    // Otros estilos de la tarjeta según sea necesario
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
