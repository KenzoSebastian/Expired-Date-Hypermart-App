import { type apiUsersType, axiosInstance } from "@/lib/api";
import { queryOptions } from "@tanstack/react-query";

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

export const getUserByIdQueryKey = ({ id }: getUserByIdRequest) => ["productsById", id];

export const getUserByIdQueryOptions = ({ id }: getUserByIdRequest) => {
  return queryOptions({
    queryKey: getUserByIdQueryKey({ id }),
    queryFn: () => getUserById({ id }),
  });
};
