import { type apiProductType, axiosInstance } from "@/lib/api";
import { queryOptions } from "@tanstack/react-query";

export type getProductsRequest = {
  sortBy?: "description" | "expiredDate" | "createdAt";
  order?: "asc" | "desc";
  page?: number;
};

export const getProducts = async ({ order, sortBy, page }: getProductsRequest): Promise<apiProductType> => {
  try {
    const { data } = await axiosInstance.get(
      `/products/?sortby=${sortBy || "expiredDate"}&order=${order || "asc"}&page=${page || 1}&limit=10`
    );
    return data;
  } catch (error) {
    console.log("Error fetching products in getProducts function:", error);
    throw error;
  }
};

export type getProductsQueryKeyProps = getProductsRequest & { isRefreshing?: boolean };

export const getProductsQueryKey = ({
  sortBy = "expiredDate",
  order = "asc",
  page = 1,
  isRefreshing = false,
}: getProductsQueryKeyProps) => ["products", sortBy, order, page, isRefreshing];

export const getProductsQueryOptions = ({ sortBy, order, page, isRefreshing }: getProductsQueryKeyProps) => {
  return queryOptions({
    queryKey: getProductsQueryKey({ sortBy, order, page, isRefreshing }),
    queryFn: () => getProducts({ order, sortBy, page }),
  });
};
