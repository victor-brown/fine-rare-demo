import { GraphQLID } from "graphql";
import { Product } from "../../models/product";
import { ProductType } from "../../schema/types";

export const getProduct = {
  type: ProductType,
  args: {
    id: { type: GraphQLID },
  },
  resolve(_parent: unknown, args: any) {
    return Product.findById(args.id);
  },
};
