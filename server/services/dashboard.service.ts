import { dbConnect } from "../db/connect";
import { ProductModel } from "../models/Product.model";

export async function getDashboardStats() {
  await dbConnect();

  const [totalProducts, activeProducts, recentlyAdded] = await Promise.all([
    ProductModel.countDocuments({}),
    ProductModel.countDocuments({ active: true }),
    ProductModel.find({}).sort({ createdAt: -1 }).limit(5).lean(),
  ]);

  return {
    totalProducts,
    activeProducts,
    inactiveProducts: totalProducts - activeProducts,
    recentlyAddedProducts: recentlyAdded,
  };
}
