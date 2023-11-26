import { processCSV } from "./CSVloader/csvLoaderMutation";
import { addProducer } from "./producer/addProducerMutation";
import { deleteProducer } from "./producer/deleteProducerMutation";
import { deleteProducers } from "./producer/deleteProducersMutation";
import { addProduct } from "./product/addProductMutation";
import { addProducts } from "./product/addProductsMutation";
import { deleteProduct } from "./product/deleteProductMutation";
import { deleteProducts } from "./product/deleteProductsMutation";
import { updateProduct } from "./product/updateProductMutation";

const mutations = {
  addProduct,
  addProducts,
  deleteProduct,
  deleteProducts,
  updateProduct,

  addProducer,
  deleteProducer,
  deleteProducers,

  processCSV
};

export default mutations;
