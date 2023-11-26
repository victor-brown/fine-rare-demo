import { GraphQLNonNull, GraphQLID, GraphQLString } from "graphql";
import { Product } from "../../models/product";
import { ProductType } from "../../schema/types";


export const updateProduct = {
  type: ProductType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    vintage: { type: GraphQLString },
    producerId: { type: GraphQLID },
  },
  resolve(_parent: unknown, args: any) {
    return Product.findByIdAndUpdate(
      args.id,
      {
        $set: {
          name: args.name,
          vintage: args.vintage,
          producerId: args.producerId,
        },
      },
      { new: true }
    );
  },
};
