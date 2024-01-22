import { useState } from "react";
import { Modal, useDisclosure } from "@chakra-ui/react";
import axios from "axios";

const PokemonStore = () => {
  const myPokemons = useDisclosure();
  const [mypokemons, setMypokemons] = useState([]);

  async function openModalMyPokemons(pokemon) {
    myPokemons.onOpen();
    try {
      const allMyPokemons = await axios.get(`/api/catched`);
      setMypokemons(allMyPokemons.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Modal {...myPokemons}>
      {/* Puedes mostrar la información de tus pokemones aquí */}
      {mypokemons.map((pokemon) => (
        <div key={pokemon.id}>
          {pokemon.name}
          {/* Agrega más información según la estructura de tus datos */}
        </div>
      ))}
    </Modal>
  );
};

export default PokemonStore;