import { QueryConfig } from "@/lib/query-client";
import { getProductsByIdQueryKeyProps, getProductsByIdQueryOptions } from "@/services/getProductById";
import { useQuery } from "@tanstack/react-query";

type useGetProductsByIdParams = {
  queryConfig?: QueryConfig<typeof getProductsByIdQueryOptions>;
  params: getProductsByIdQueryKeyProps;
};

export const useGetProductsById = ({ queryConfig, params }: useGetProductsByIdParams) => {
  return useQuery({
    ...getProductsByIdQueryOptions({ ...params }),
    ...queryConfig,
  });
};
