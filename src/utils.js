import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

export const secretGenerator = () => {
   const randomNumber = Math.floor(Math.random() * adjectives.length);
   return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = email => {
   const options = {
      auth: {
         api_user: process.env.SENDGRID_USERNAME,
         api_key: process.env.SENDGRID_PASSWORD
      }
   };

   const client = nodemailer.createTransport(sgTransport(options));
   return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
   const email = {
      from: "thesavit@gmail.com",
      to: address,
      subject: "Login Secret for Prismagram🔒",
      html: `Hello! Your login secret is ${secret}.<br/>Copy and paste on the app/web to log in.`
   };

   return sendMail(email);
};
