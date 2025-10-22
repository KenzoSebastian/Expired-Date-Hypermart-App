import { QueryConfig } from "@/lib/query-client";
import { type getProductsQueryKeyProps, getProductsQueryOptions } from "@/services/getProducts";
import { useQuery } from "@tanstack/react-query";

type useGetProductsParams = {
  queryConfig?: QueryConfig<typeof getProductsQueryOptions>;
  params?: getProductsQueryKeyProps;
};

export const useGetProducts = ({ queryConfig, params }: useGetProductsParams = {}) => {
  return useQuery({
    ...getProductsQueryOptions({...params}),
    ...queryConfig,
  });
};
