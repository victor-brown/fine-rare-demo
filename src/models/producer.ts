import mongoose from "mongoose";

const ProducerSchema = new mongoose.Schema({
  name: { type: String },
  country: { type: String },
  region: { type: String },
});

export const Producer = mongoose.model("Producer", ProducerSchema);
