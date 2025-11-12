import { type apiSingleProductType, axiosInstance } from "@/lib/api";
import { queryOptions } from "@tanstack/react-query";

export type getProductsByIdRequest = {
  id: number;
};

export const getProductsById = async ({ id }: getProductsByIdRequest): Promise<apiSingleProductType> => {
  try {
    const { data } = await axiosInstance.get(`/products/searchId/${id}`);
    return data;
  } catch (error) {
    console.log("Error fetching products in getProductsById function:", error);
    throw error;
  }
};

export type getProductsByIdQueryKeyProps = getProductsByIdRequest;

export const getProductsByIdQueryKey = ({ id }: getProductsByIdQueryKeyProps) => ["productsById", id];

export const getProductsByIdQueryOptions = ({ id }: getProductsByIdQueryKeyProps) => {
  return queryOptions({
    queryKey: getProductsByIdQueryKey({ id }),
    queryFn: () => getProductsById({ id }),
  });
};
