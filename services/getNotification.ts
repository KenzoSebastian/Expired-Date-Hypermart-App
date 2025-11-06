import { type apiNotificationType, axiosInstance } from "@/lib/api";
import { queryOptions } from "@tanstack/react-query";

export type getNotificationRequest = {
  userId: string;
};

export const getNotification = async ({ userId }: getNotificationRequest): Promise<apiNotificationType> => {
  try {
    const { data } = await axiosInstance.get(`/notification/${userId}`);
    return data;
  } catch (error) {
    console.log("Error fetching notifications in getNotification function:", error);
    throw error;
  }
};

export type getNotificationQueryKeyProps = getNotificationRequest & { isRefreshing?: boolean };

export const getNotificationQueryKey = ({ userId, isRefreshing = false }: getNotificationQueryKeyProps) => [
  "notification",
  userId,
  isRefreshing,
];

export const getNotificationQueryOptions = ({ userId, isRefreshing }: getNotificationQueryKeyProps) => {
  return queryOptions({
    queryKey: getNotificationQueryKey({ userId, isRefreshing }),
    queryFn: () => getNotification({ userId }),
  });
};