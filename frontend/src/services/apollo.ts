import { ApolloClient, InMemoryCache } from "@apollo/client";

const serverUri = import.meta.env.VITE_API;

export const client = new ApolloClient({
  uri: serverUri,
  cache: new InMemoryCache()
});
