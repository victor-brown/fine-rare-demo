import { GraphQLList } from "graphql";
import { Product } from "../../models/product";
import { ProductType, ProductListType } from "../../schema/types";
import { Producer } from "../../models/producer";

export const addProducts = {
  type: GraphQLList(ProductType),
  args: {
    products: { type: GraphQLList(ProductListType) },
  },
  async resolve(_parent: unknown, args: any) {
    const uniqueProducerIds = Array.from(
      new Set(args.products.map((product: any) => product.producerId))
    );

    const existingProducers = (
      await Producer.find({
        _id: { $in: uniqueProducerIds },
      })
    ).map((producer) => producer._id.toString());

    if (existingProducers.length !== uniqueProducerIds.length) {
      return Error("Missing producer");
    }

    const result = await Product.insertMany(args.products);
    return result;
  },
};
