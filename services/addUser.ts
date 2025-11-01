import { type apiUsersType, axiosInstance } from "@/lib/api";

export type addUserRequest = {
  userId: string;
  username: string;
  expoPushToken: string;
};

export const addUser = async ({ userId, username, expoPushToken }: addUserRequest): Promise<apiUsersType> => {
  try {
    const { data } = await axiosInstance.post("/users/add", { userId, username, expoPushToken });
    return data;
  } catch (error) {
    console.log("Error adding user in addUser function:", error);
    throw error;
  }
};
