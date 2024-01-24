import { Center, Button } from '@chakra-ui/react'
import styles from '../styles/Home.module.css'

export const ButtonMyPokemons = ({ onClick }) => {
  return (
    <Center mb="5" spacing="2">
      <Button
        as="button"
        onClick={onClick}
        pos="fixed"
        bottom="10"
        right="10"
        zIndex={99}
        borderRadius="full"
        className={styles.buttonPokeball}
      >
      </Button>
    </Center>
  )
}