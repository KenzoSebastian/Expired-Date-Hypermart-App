import { type apiUsersType, axiosInstance } from "@/lib/api";

type updateExpoTokenUserProps = {
  userId: string;
  expoPushToken: string;
};

export const updateExpoTokenUser = async ({
  userId,
  expoPushToken,
}: updateExpoTokenUserProps): Promise<apiUsersType> => {
  try {
    const { data } = await axiosInstance.patch("/users/update", { userId, expoPushToken });
    return data;
  } catch (error) {
    console.log("Error updating user token in updateExpoTokenUser function:", error);
    throw error;
  }
};
