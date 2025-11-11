import { MutationConfig } from "@/lib/query-client";
import { deleteNotification, type deleteNotificationRequest } from "@/services/deleteNotification";
import { useMutation } from "@tanstack/react-query";

type useDeleteNotificationProps = {
  mutationConfig?: MutationConfig<typeof deleteNotification>;
};

export const useDeleteNotification = ({ mutationConfig }: useDeleteNotificationProps = {}) => {
  return useMutation({
    ...mutationConfig,
    mutationFn: (params: deleteNotificationRequest) => deleteNotification(params),
  });
};
