import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { Producer } from "../../models/producer";
import { Product } from "../../models/product";
import { DeleteManyType } from "../../schema/types";

export const deleteProducers = {
  type: DeleteManyType,
  args: {
    ids: { type: GraphQLNonNull(GraphQLList(GraphQLID)) },
  },
  async resolve(_parent: unknown, args: any) {
    try {
      await Product.deleteMany({ producerId: { $in: args.ids } });

      const result = await Producer.deleteMany({ _id: { $in: args.ids } });
      return {
        acknowledged: result.acknowledged,
        deletedCount: result.deletedCount || 0,
      };
    } catch (error) {
      throw new Error("Error deleting Producer");
    }
  },
};
