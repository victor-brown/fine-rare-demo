import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({ schema, graphiql: process.env.NODE_ENV === "dev" })
);

app.listen(port, () => {
  console.log(`${process.env.NODE_ENV} -- Server is running on port ${port}`);
  console.log(`Open: http://localhost:${port}/graphql`);
});
