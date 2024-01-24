import { Checkbox, Box } from "@chakra-ui/react";



const PokemonCheckbox = ({ isChecked, onChange, label, isDisabled }) => (

  <Box m="auto" top="" right="5" zIndex="99">
    <Checkbox colorScheme='green' isChecked={isChecked} onChange={onChange} fontWeight="600" isDisabled={isDisabled}>
      {label}
    </Checkbox>
  </Box>
);

export default PokemonCheckbox;