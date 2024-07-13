import { ApolloClient, InMemoryCache } from "@apollo/client";

const serverUri = "http://localhost:4000";

export const client = new ApolloClient({
  uri: serverUri,
  cache: new InMemoryCache()
});
