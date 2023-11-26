import { GraphQLObjectType } from "graphql";
import mutations from "../mutations";

export const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: mutations,
});
