import React from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "../services/client";
import { Provider } from "react-redux";
import theme from "../theme";
import { store } from "../redux/store";

const Main = ({ children }) => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Router>{children}</Router>
        </ChakraProvider>
      </ApolloProvider>
    </Provider>
  );
};

export default Main;
