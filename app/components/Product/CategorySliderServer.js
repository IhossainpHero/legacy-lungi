import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import CategorySliderClient from "./CategorySliderClient";

export default async function CategorySliderServer() {
  await connectDB();

  const categories = await Category.find(
    {},
    { name: 1, slug: 1, image: 1, _id: 0 }
  ).lean();

  return <CategorySliderClient categories={categories} />;
}
  