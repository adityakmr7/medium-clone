import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "../services/client";
const Main = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Router>{children}</Router>
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default Main;
