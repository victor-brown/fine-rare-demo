import { GraphQLObjectType } from "graphql";
import queries from "../queries";

export const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: queries,
});
