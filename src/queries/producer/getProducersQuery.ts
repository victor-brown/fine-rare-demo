import { GraphQLList } from "graphql";
import { Producer } from "../../models/producer";
import { ProducerType } from "../../schema/types";

export const getProducers = {
  type: GraphQLList(ProducerType),
  resolve(_parent: unknown, _args: any) {
    return Producer.find();
  },
};
