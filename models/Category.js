import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String, required: true }, // image URL or path
});

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
