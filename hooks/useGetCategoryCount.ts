import { QueryConfig } from "@/lib/query-client";
import { getCategoryCountQueryOptions } from "@/utils/getCategoryCount";
import { useQuery } from "@tanstack/react-query";

type useGetCategoryCountParams = {
  queryConfig?: QueryConfig<typeof getCategoryCountQueryOptions>;
  params: { isRefreshing: boolean };
};

export const useGetCategoryCount = ({ queryConfig, params }: useGetCategoryCountParams) => {
  return useQuery({
    ...getCategoryCountQueryOptions(params.isRefreshing),
    ...queryConfig,
  });
};
