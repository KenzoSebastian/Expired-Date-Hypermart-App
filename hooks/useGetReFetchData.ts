import { MutationConfig } from "@/lib/query-client";
import { getRefetchData, type getRefetchDataRequest } from "@/utils/getRefetchData";
import { useMutation } from "@tanstack/react-query";
import { SetStateAction } from "react";

type useGetReFetchDataProps = {
  mutationConfig?: MutationConfig<typeof getRefetchData>;
  params: getRefetchDataRequest & { setIsRefreshing: React.Dispatch<SetStateAction<boolean>> };
};
export const useGetReFetchData = ({ mutationConfig, params }: useGetReFetchDataProps) => {
  return useMutation({
    ...mutationConfig,
    mutationFn: () => {
      params.setIsRefreshing(true);
      return getRefetchData(params);
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      params.setIsRefreshing(false);
      mutationConfig?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
};
