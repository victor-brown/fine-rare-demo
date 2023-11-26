import { GraphQLNonNull, GraphQLString } from "graphql";
import { Producer } from "../../models/producer";
import { ProducerType } from "../../schema/types";


export const addProducer = {
  type: ProducerType,
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    country: { type: GraphQLNonNull(GraphQLString) },
    region: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve(_parent: unknown, args: any) {
    return Producer.create({
      name: args.name,
      country: args.country,
      region: args.region,
    });
  },
};
