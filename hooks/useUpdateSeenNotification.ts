import { MutationConfig } from "@/lib/query-client";
import { updateSeenNotification, updateSeenNotificationRequest } from "@/services/updateSeenNotification";
import { useMutation } from "@tanstack/react-query";

type useUpdateSeenNotificationProps = {
  mutationConfig?: MutationConfig<typeof updateSeenNotification>;
};

export const useUpdateSeenNotification = ({ mutationConfig }: useUpdateSeenNotificationProps = {}) => {
  return useMutation({
    ...mutationConfig,
    mutationFn: (params: updateSeenNotificationRequest) => updateSeenNotification(params),
  });
};
