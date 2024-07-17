import "reflect-metadata";
import "dotenv/config";

import { ApolloServer } from "apollo-server";
import path from "path";
import { buildSchema } from "type-graphql";
import { PaymentResolver } from "./resolvers/PaymentResolver";
import { databaseConnection } from "./database/databaseConnection";
import { InstallmentResolver } from "./resolvers/InstallmentResolver";
import { Server } from "socket.io";


export const io = new Server({
  cors: { "origin": "*" }
});

const PORT = process.env.PORT || "4000";

async function initialize() {
  await databaseConnection
  console.log("DATABASE CONNECT SUCCESS")

  const schema = await buildSchema({
    resolvers: [
      PaymentResolver,
      InstallmentResolver
    ],
    emitSchemaFile: path.resolve(__dirname, "schema.gql")
  });

  const server = new ApolloServer({
    schema
  });

  io.listen(4001);
  const { url } = await server.listen(PORT);
  console.log(`Server running on ${url}`)
};

initialize();
import "./listeners/websocket"; 
