import { type apiNotificationType, axiosInstance } from "@/lib/api";

export type updateSeenNotificationRequest = {
  id: string;
};

export const updateSeenNotification = async ({
  id,
}: updateSeenNotificationRequest): Promise<apiNotificationType> => {
  try {
    const { data } = await axiosInstance.patch("/notification/update", { id });
    return data;
  } catch (error) {
    console.log("Error updating seen notification in updateSeenNotification function:", error);
    throw error;
  }
};
