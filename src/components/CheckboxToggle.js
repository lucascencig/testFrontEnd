import { Checkbox, Box } from "@chakra-ui/react";


const PokemonCheckbox = ({ isChecked, onChange, label }) => (
  <Box m="auto" top="" right="5" zIndex="99">
    <Checkbox colorScheme='green' isChecked={isChecked} onChange={onChange} fontWeight="600">
      {label}
    </Checkbox>
  </Box>
);

export default PokemonCheckbox;