import { QueryConfig } from "@/lib/query-client";
import { getNotificationQueryKeyProps, getNotificationQueryOptions } from "@/services/getNotification";
import { useQuery } from "@tanstack/react-query";

type useGetNotificationParams = {
  queryConfig?: QueryConfig<typeof getNotificationQueryOptions>;
  params: getNotificationQueryKeyProps;
};

export const useGetNotification = ({ queryConfig, params }: useGetNotificationParams) => {
  return useQuery({
    ...getNotificationQueryOptions({ ...params }),
    ...queryConfig,
  });
};
