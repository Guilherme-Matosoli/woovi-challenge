import "reflect-metadata";
import "dotenv/config";

import { ApolloServer } from "apollo-server";
import path from "path";
import { buildSchema } from "type-graphql";
import { PaymentResolver } from "./resolvers/PaymentResolver";


async function initialize() {
  const schema = await buildSchema({
    resolvers: [
      PaymentResolver
    ],
    emitSchemaFile: path.resolve(__dirname, "schema.gql")
  });

  const server = new ApolloServer({
    schema
  });


  const { url } = await server.listen("4000");
  console.log(`Server running on ${url}`)
};

initialize();
