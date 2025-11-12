import { type apiNotificationType, axiosInstance } from "@/lib/api";

export type updateQuantityProductRequest = {
  id: number;
  quantity: number;
};

export const updateQuantityProduct = async ({
  id,
  quantity,
}: updateQuantityProductRequest): Promise<apiNotificationType> => {
  try {
    const { data } = await axiosInstance.patch("/products/update/quantity", { id, quantity });
    return data;
  } catch (error) {
    console.log("Error updating quantity in updateQuantityProduct function:", error);
    throw error;
  }
};
