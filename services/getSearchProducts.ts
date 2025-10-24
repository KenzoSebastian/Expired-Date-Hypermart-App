import { ProductsAPI } from "@/lib/api";
import { queryOptions } from "@tanstack/react-query";

export const getSearchProducts = async (searchQuery: string) => {
  try {
    const { data } = await ProductsAPI.get(`/search/?searchQuery=${searchQuery}`);
    return data;
  } catch (error) {
    console.log("Error searching products in getSearchProducts function:", error);
    throw error;
  }
};

export const getSearchProductsKey = (searchQuery: string) => ["search", searchQuery];

export const getSearchProductsOptions = (searchQuery: string) =>
  queryOptions({
    queryKey: getSearchProductsKey(searchQuery),
    queryFn: () => getSearchProducts(searchQuery),
  });
