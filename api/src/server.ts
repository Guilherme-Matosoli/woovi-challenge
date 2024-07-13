import "reflect-metadata";
import "dotenv/config";

import { ApolloServer } from "apollo-server";
import path from "path";
import { buildSchema } from "type-graphql";
import { PaymentResolver } from "./resolvers/PaymentResolver";
import { databaseConnection } from "./database/databaseConnection";
import { Server } from "socket.io";


async function initialize() {
  await databaseConnection
  console.log("DATABASE CONNECT SUCCESS")

  const schema = await buildSchema({
    resolvers: [
      PaymentResolver
    ],
    emitSchemaFile: path.resolve(__dirname, "schema.gql")
  });

  const server = new ApolloServer({
    schema
  });

  const io = new Server();

  io.listen(4001);
  const { url } = await server.listen("4000");
  console.log(`Server running on ${url}`)
};

initialize();
