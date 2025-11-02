import { type apiProductType } from "@/lib/api";
import { type CategoryCountType, getCategoryCount } from "./getCategoryCount";
import { getProducts } from "../services/getProducts";

export type getRefetchDataRequest = {
  order?: "asc" | "desc";
  sortBy?: "description" | "expiredDate" | "createdAt";
  page?: number;
};

export const getRefetchData = async ({
  order,
  sortBy,
  page,
}: getRefetchDataRequest): Promise<[apiProductType, CategoryCountType]> => {
  try {
    const getProductsQuery = getProducts({ order, sortBy: sortBy, page });
    const getCategoryCountQuery = getCategoryCount();
    return Promise.all([getProductsQuery, getCategoryCountQuery]);
  } catch (error) {
    console.log("Error refetching products in getRefetchData function:", error);
    throw error;
  }
};
