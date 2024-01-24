import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  SimpleGrid,
  Box,
  Image,
  Center,
  Button,
  Stack,
  Text
} from "@chakra-ui/react";
import styles from "../styles/Home.module.css";


export const MyPokemonsModal = ({ isOpen, onClose, myPokemons, handleDeletePokemon }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent
      w={{ base: '340px', md: '600px', lg: "600px" }}
      borderRadius="2xl"
      mt={{ base: "30%", md: "15%", lg: "10%" }}
      color="#fff"
      bg="#000000f3"
      border='1px'
      borderColor='gray.200'
      className={styles.description}
    >
      <ModalHeader textTransform="capitalize">
        <p>My Pokemons</p>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody my={{ base: "1", md: '8', lg: '8' }}>
        <SimpleGrid spacing="5" columns={{ base: 2, md: 3, lg: 3 }}>
          {
            myPokemons.length <= 0
              ?
              (
                <Center w='300px' fontWeight='600' fontSize="15" justifyContent="center" alignItems="center" m="auto">
                  <Stack justifyContent="center" alignItems="center">
                    <Text>Prof. Oak:</Text>
                    <p className={styles.typedText}>You don´t have any pokemon yet!</p>
                  </Stack>
                </Center>
              )

              :

              (
                myPokemons.map((pokemon) => (
                  <Box key={pokemon.id}>
                    <Image
                      w={280}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
                      alt={`${pokemon.name}`}
                    />
                    <Center fontSize="lg" fontWeight='600' className={styles.description}>
                      {pokemon.name}
                    </Center>
                    <Button borderRadius='full' display="flex" alignItems="center" justifyContent="center" mx="auto" onClick={() => handleDeletePokemon(pokemon)} className={styles.buttonDelete} />
                  </Box>
                ))
              )
          }
        </SimpleGrid>
      </ModalBody>
    </ModalContent>
  </Modal>
);