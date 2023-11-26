import { getProducer } from "./producer/getProducerQuery";
import { getProducers } from "./producer/getProducersQuery";
import { getProduct } from "./product/getProductQuery";
import { getProducts } from "./product/getProductsQuery";

const queries = {
  product: getProduct,
  products: getProducts,

  producer: getProducer,
  producers: getProducers,
};

export default queries;
