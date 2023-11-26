import { GraphQLNonNull, GraphQLString, GraphQLID } from "graphql";
import { Product } from "../../models/product";
import { ProductType } from "../../schema/types";

export const addProduct = {
  type: ProductType,
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    vintage: { type: GraphQLNonNull(GraphQLString) },
    producerId: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve(_parent: unknown, args: any) {
    return Product.create({
      name: args.name,
      vintage: args.vintage,
      producerId: args.producerId,
    });
  },
};
