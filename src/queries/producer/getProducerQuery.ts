import { GraphQLID } from "graphql";
import { Producer } from "../../models/producer";
import { ProducerType } from "../../schema/types";

export const getProducer = {
  type: ProducerType,
  args: {
    id: { type: GraphQLID },
  },
  resolve(_parent: unknown, args: any) {
    return Producer.findById(args.id);
  },
};
