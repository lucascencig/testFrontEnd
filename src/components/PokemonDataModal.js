import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import PokemonData from "@/components/PokemonData";
import styles from "../styles/Home.module.css";

export const PokemonDataModal = ({ isOpen, onClose, selectedPokemon }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent
      w={{ base: '360px', md: '600px', lg: "600px" }}
      borderRadius="2xl"
      color="#fff"
      bg="#000000f3"
      border='1px'
      borderColor='gray.200'
      className={styles.description}
    >
      <ModalHeader>
        <p fontSize="2xl" zIndex={99} className={styles.titlePokemon}>
          {selectedPokemon?.name}
        </p>
      </ModalHeader>
      <ModalCloseButton zIndex={99} />
      <ModalBody>{selectedPokemon && <PokemonData pokemon={selectedPokemon} />}</ModalBody>
    </ModalContent>
  </Modal>
);