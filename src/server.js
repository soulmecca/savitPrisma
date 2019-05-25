require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";

const PORT = process.env.PORT || 4000;

console.log("!!!!! ", schema);

const server = new GraphQLServer({ schema });

server.express.use(logger("dev"));

server.start({ PORT }, () => console.log(`server running on port ${PORT}`));
