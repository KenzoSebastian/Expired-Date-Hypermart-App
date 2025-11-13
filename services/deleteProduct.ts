import { type apiProductType, axiosInstance } from "@/lib/api";

export type deleteProductRequest = {
  id: number;
};

export const deleteProduct = async ({ id }: deleteProductRequest): Promise<apiProductType> => {
  try {
    const { data } = await axiosInstance.delete(`/products/delete/`, { data: { id } });
    console.log("delete");
    return data;
  } catch (error) {
    console.log("Error deleting notification in deleteProduct function:", error);
    throw error;
  }
};
