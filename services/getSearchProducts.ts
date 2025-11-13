import { type apiProductSearchType, axiosInstance } from "@/lib/api";
import { queryOptions } from "@tanstack/react-query";

export const getSearchProducts = async (searchQuery: string): Promise<apiProductSearchType> => {
  try {
    const { data } = await axiosInstance.get(`/products/search/?searchQuery=${searchQuery}`);
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
