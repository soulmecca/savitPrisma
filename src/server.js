
import './jwt'
import { GraphQLServer } from "graphql-yoga";
import passport from 'passport';
import "./passport";
import { authenticateJwt } from  "./passport";
import logger from "morgan";
import schema from "./schema";
import { sendSecretMail } from "./utils";

const port = process.env.PORT;
const PORT = process.env.PORT || 4000;

// * { request } means there is request object from graphql then 
// * then we destructure it to get request object inside of it 
// * this request object is from Express 

const server = new GraphQLServer({ 
    schema, 
    context: ({request}) => ({request})
 });

server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({ PORT }, () => console.log(`server running on port ${PORT}😀`));
