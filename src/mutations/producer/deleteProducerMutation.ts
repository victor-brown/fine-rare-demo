import { GraphQLID, GraphQLNonNull } from "graphql";
import { Producer } from "../../models/producer";
import { Product } from "../../models/product";
import { ProducerType } from "../../schema/types";


export const deleteProducer = {
  type: ProducerType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  },
  async resolve(_parent: unknown, args: any) {
    await Product.deleteMany({ producerId: args.id });
    return Producer.findByIdAndDelete(args.id);
  },
};
