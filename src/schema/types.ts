import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { Producer } from "../models/producer";

export const DeleteManyType = new GraphQLObjectType({
  name: "DeleteMany",
  fields: () => ({
    acknowledged: {
      type: GraphQLBoolean,
    },
    deletedCount: {
      type: GraphQLInt,
    },
  }),
});

export const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    _id: { type: GraphQLID },
    vintage: { type: GraphQLString },
    name: { type: GraphQLString },
    producerId: { type: GraphQLString },
    producer: {
      type: ProducerType,
      resolve(parent, _args) {
        return Producer.findById(parent.producerId);
      },
    },
  }),
});

export const ProductListType = new GraphQLInputObjectType({
  name: "ProductList",
  fields: () => ({
    name: { type: GraphQLNonNull(GraphQLString) },
    vintage: { type: GraphQLNonNull(GraphQLString) },
    producerId: { type: GraphQLNonNull(GraphQLID) },
  }),
});

export const ProducerType = new GraphQLObjectType({
  name: "Producer",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    region: { type: GraphQLString },
  }),
});
