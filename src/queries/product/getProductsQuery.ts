import { GraphQLList } from "graphql";
import { Product } from "../../models/product";
import { ProductType } from "../../schema/types";

export const getProducts = {
  type: GraphQLList(ProductType),
  resolve(_parent: unknown, _args: any) {
    return Product.find();
  },
};
