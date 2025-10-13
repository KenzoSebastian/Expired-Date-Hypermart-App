import { QueryConfig } from "@/lib/query-client";
import { getCategoryQueryKeyProps, getCategoryQueryOptions } from "@/services/getCategory";
import { useQuery } from "@tanstack/react-query";

type useGetCategoryParams = {
  queryConfig?: QueryConfig<typeof getCategoryQueryOptions>;
  params: getCategoryQueryKeyProps;
};

export const useGetCategory = ({ queryConfig, params }: useGetCategoryParams) => {
  return useQuery({
    ...getCategoryQueryOptions({ category: params.category, isRefreshing: params.isRefreshing }),
    ...queryConfig,
  });
};
