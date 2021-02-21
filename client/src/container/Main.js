import React from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "../services/client";
import theme from "../theme";
const Main = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Router>{children}</Router>
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default Main;
