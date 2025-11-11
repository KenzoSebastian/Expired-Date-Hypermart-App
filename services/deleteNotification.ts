import { apiNotificationType, axiosInstance } from "@/lib/api";

export type deleteNotificationRequest = {
  id: string;
};

export const deleteNotification = async ({ id }: deleteNotificationRequest): Promise<apiNotificationType> => {
  try {
    const { data } = await axiosInstance.delete(`/notification/delete/`, { data: { id } });
    return data;
  } catch (error) {
    console.log("Error deleting notification in deleteNotification function:", error);
    throw error;
  }
};
