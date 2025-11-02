import { type apiUsersType, axiosInstance } from "@/lib/api";

export type getUserByIdRequest = {
  id: string;
};

export const getUserById = async ({ id }: getUserByIdRequest): Promise<apiUsersType> => {
  try {
    const { data } = await axiosInstance.get(`/users/${id}`);
    return data;
  } catch (error) {
    console.log("Error fetching products in getUserById function:", error);
    throw error;
  }
};
