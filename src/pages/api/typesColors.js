export const getTypeColors = (types) => {
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


