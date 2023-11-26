import { GraphQLNonNull, GraphQLID } from "graphql";
import { Product } from "../../models/product";
import { ProductType } from "../../schema/types";


export const deleteProduct = {
  type: ProductType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve(_parent: unknown, args: any) {
    return Product.findByIdAndDelete(args.id);
  },
};
