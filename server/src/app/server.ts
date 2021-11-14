import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import path from 'path';
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import dotenv from 'dotenv';
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";
import { MovieResolver } from "./resolvers/movie";
dotenv.config();

const main = async () => {
  await createConnection({
    name:'default',
    type: "postgres",
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    port:Number(process.env.DB_PORT),
    database:process.env.DB_NAME,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User],
  });
  await User.delete({});

  const PORT = Number(process.env.PORT || 4000);
  const app = express();
  app.use(cors({
    origin:'*'
  }));
  app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
  app.use(compression());
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver,UserResolver,MovieResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
    playground:process.env.NODE_ENV === 'development'
  });
  await server.applyMiddleware({ app, path: "/graphql" });
  const httpServer = createServer(app);
  httpServer.listen({ port: PORT }, (): void =>
    console.log(`🚀GraphQL-Server is running on http://localhost:4000/graphql`)
  );
};
main().catch(error=>console.log(error));
