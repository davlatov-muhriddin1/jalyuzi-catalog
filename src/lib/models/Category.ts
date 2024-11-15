import { model, models, Schema } from "mongoose";

const CategorySchema = new Schema({
  title: { type: String, required: true },
});

const Category = models.Category || model("Category", CategorySchema);
export default Category;
