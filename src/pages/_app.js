import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import theme from '../pages/api/theme.js'


export default function App({ Component, pageProps }) {
  return (

    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>

  );
}
