import { ProductsAPI } from "@/server/api";

export const fetchAllProducts = async (
  sortBy?: "description" | "expiredDate" | "createdAt",
  order?: "asc" | "desc"
) => {
  try {
    const { data } = await ProductsAPI.get(`/products/?sortby=${sortBy}&order=${order}&page=1&limit=10`);
    return data;
  } catch (error) {
    console.log("Error fetching products:", error);
    throw error;
  }
};

export const fetchCategoryProducts = async (
  category: "expired" | "expiringSoon" | "expiringLater" | "goodProducts"
) => {
  try {
    const { data } = await ProductsAPI.get(`/productCategories/${category}?page=1&limit=10`);
    return data;
  } catch (error) {
    console.error("Error fetching category products:", error);
    throw error;
  }
};

export const getCountProductsByCategory = async () => {
  try {
    const queryExpired = fetchCategoryProducts("expired");
    const queryExpiringSoon = fetchCategoryProducts("expiringSoon");
    const queryExpiringLater = fetchCategoryProducts("expiringLater");
    const queryGoodProduct = fetchCategoryProducts("goodProducts");

    const [dataExpired, dataExpiringSoon, dataExpiringLater, dataGoodProduct] = await Promise.all([
      queryExpired,
      queryExpiringSoon,
      queryExpiringLater,
      queryGoodProduct,
    ]);

    return {
      expired: dataExpired.meta.totalItems,
      expiringSoon: dataExpiringSoon.meta.totalItems,
      expiringLater: dataExpiringLater.meta.totalItems,
      goodProducts: dataGoodProduct.meta.totalItems,
    };
  } catch (error) {
    console.error("Error fetching product counts by category:", error);
    throw error;
  }
};
