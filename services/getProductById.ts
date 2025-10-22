import { type apiSingleProductType, ProductsAPI } from "@/lib/api";
import { queryOptions } from "@tanstack/react-query";

export type getProductsByIdRequest = {
  id: number;
};

export const getProductsById = async ({ id }: getProductsByIdRequest): Promise<apiSingleProductType> => {
  try {
    const { data } = await ProductsAPI.get(`/searchId/${id}`);
    return data;
  } catch (error) {
    console.log("Error fetching products in getProductsById function:", error);
    throw error;
  }
};

export type getProductsByIdQueryKeyProps = getProductsByIdRequest & { isRefreshing?: boolean };

export const getProductsByIdQueryKey = ({ id, isRefreshing = false }: getProductsByIdQueryKeyProps) => [
  "productsById",
  id,
  isRefreshing,
];

export const getProductsByIdQueryOptions = ({ id, isRefreshing }: getProductsByIdQueryKeyProps) => {
  return queryOptions({
    queryKey: getProductsByIdQueryKey({ id, isRefreshing }),
    queryFn: () => getProductsById({ id }),
  });
};
