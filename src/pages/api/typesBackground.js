export const getTypeBackground = (type) => {
  switch (type) {
    case 'grass':
      return 'linear-gradient(to bottom, #9CCF73, #58BB47)';
    case 'fire':
      return 'linear-gradient(to bottom, #FF6E00, #F76333)';
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

    default:
      return 'linear-gradient(to bottom, #A0AEC0, #5B6477)';
  }
};