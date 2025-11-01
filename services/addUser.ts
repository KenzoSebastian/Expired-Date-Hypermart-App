import { type apiUsersType, axiosInstance, UserType } from "@/lib/api";

export type addUserRequest = Omit<UserType, "createdAt" | "updatedAt">;

export const addUser = async ({
  id: userId,
  username,
  email,
  memberSince,
  storeCode,
  imageUrl,
  expoPushToken,
}: addUserRequest): Promise<apiUsersType> => {
  try {
    const { data } = await axiosInstance.post("/users/add", {
      userId,
      email,
      memberSince,
      storeCode,
      username,
      imageUrl,
      expoPushToken,
    });
    return data;
  } catch (error) {
    console.log("Error adding user in addUser function:", error);
    throw error;
  }
};
