import { GraphQLNonNull, GraphQLID, GraphQLList } from "graphql";
import { Product } from "../../models/product";
import { DeleteManyType } from "../../schema/types";


export const deleteProducts = {
  type: DeleteManyType,
  args: {
    ids: { type: GraphQLNonNull(GraphQLList(GraphQLID)) },
  },
  async resolve(_parent: unknown, args: any) {
    try {
      const result = await Product.deleteMany({ _id: { $in: args.ids } });
      return {
        acknowledged: result.acknowledged,
        deletedCount: result.deletedCount || 0,
      };
    } catch (error) {
      throw new Error("Error deleting products");
    }
  },
};
