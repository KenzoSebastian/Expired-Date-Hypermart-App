import { QueryConfig } from "@/lib/query-client";
import { getUserByIdQueryOptions, getUserByIdRequest } from "@/services/getUserById";
import { useQuery } from "@tanstack/react-query";

type useGetUserByIdParams = {
  queryConfig?: QueryConfig<typeof getUserByIdQueryOptions>;
  params: getUserByIdRequest;
};

export const useGetUserById = ({ queryConfig, params }: useGetUserByIdParams) => {
  return useQuery({
    ...getUserByIdQueryOptions({ ...params }),
    ...queryConfig,
  });
};
