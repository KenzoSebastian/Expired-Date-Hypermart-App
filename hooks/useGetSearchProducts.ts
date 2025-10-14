import { QueryConfig } from "@/lib/query-client";
import { getSearchProductsOptions } from "@/services/getSearchProducts";
import { useQuery } from "@tanstack/react-query";

type useGetSearchProductsParams = {
  queryConfig?: QueryConfig<typeof getSearchProductsOptions>;
  params: { searchQuery: string };
};

export const useGetSearchProducts = ({ queryConfig, params }: useGetSearchProductsParams) => {
  return useQuery({ ...getSearchProductsOptions(params.searchQuery), ...queryConfig });
};
