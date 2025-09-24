import { ProductsAPI } from "@/server/api";

export const fetchProducts = async () => {
  try {
    const { data } = await ProductsAPI.get("/?page=1&limit=500");
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
