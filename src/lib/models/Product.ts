import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  imgs: { type: Array, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  category: {type: String, required: true}
});

const Product = models.Products || model("Products", ProductSchema);
export default Product;
