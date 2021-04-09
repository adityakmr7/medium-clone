import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
const link = createHttpLink({
  uri: "http://localhost:8080/graphql",
  credentials: "include",
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV || "development",
  queryDeduplication: true,
});
