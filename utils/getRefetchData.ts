import { apiNotificationType, type apiProductType } from "@/lib/api";
import { type CategoryCountType, getCategoryCount } from "./getCategoryCount";
import { getProducts } from "../services/getProducts";
import { getNotification } from "@/services/getNotification";

export type getRefetchDataRequest = {
  order?: "asc" | "desc";
  sortBy?: "description" | "expiredDate" | "createdAt";
  page?: number;
  userId: string;
};

export const getRefetchData = async ({
  order,
  sortBy,
  page,
  userId,
}: getRefetchDataRequest): Promise<[apiProductType, CategoryCountType, apiNotificationType]> => {
  try {
    const getProductsQuery = getProducts({ order, sortBy: sortBy, page });
    const getCategoryCountQuery = getCategoryCount();
    const notificationsQuery = getNotification({ userId });
    return Promise.all([getProductsQuery, getCategoryCountQuery, notificationsQuery]);
  } catch (error) {
    console.log("Error refetching products in getRefetchData function:", error);
    throw error;
  }
};
