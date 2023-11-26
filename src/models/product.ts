import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String },
  vintage: { type: String },
  producerId: { type: mongoose.Schema.Types.ObjectId, ref: "Producer" },
});

export const Product = mongoose.model("Product", ProductSchema);
