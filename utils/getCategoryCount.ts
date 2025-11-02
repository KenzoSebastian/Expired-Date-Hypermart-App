import { queryOptions } from "@tanstack/react-query";
import { getCategory } from "../services/getCategory";

export type CategoryCountType = {
  expired: number;
  expiringSoon: number;
  expiringLater: number;
  goodProducts: number;
};

export const getCategoryCount = async (): Promise<CategoryCountType> => {
  try {
    const queryExpired = getCategory({ category: "expired" });
    const queryExpiringSoon = getCategory({ category: "expiringSoon" });
    const queryExpiringLater = getCategory({ category: "expiringLater" });
    const queryGoodProduct = getCategory({ category: "goodProducts" });

    const [dataExpired, dataExpiringSoon, dataExpiringLater, dataGoodProduct] = await Promise.all([
      queryExpired,
      queryExpiringSoon,
      queryExpiringLater,
      queryGoodProduct,
    ]);

    return {
      expired: dataExpired.meta.totalItems,
      expiringSoon: dataExpiringSoon.meta.totalItems,
      expiringLater: dataExpiringLater.meta.totalItems,
      goodProducts: dataGoodProduct.meta.totalItems,
    };
  } catch (error) {
    console.log("Error fetching category count in getCategoryCount function:", error);
    throw error;
  }
};

export const getCategoryCountQueryKey = (isRefreshing: boolean) => ["categoryCount", isRefreshing];

export const getCategoryCountQueryOptions = (isRefreshing: boolean) => {
  return queryOptions({
    queryKey: getCategoryCountQueryKey(isRefreshing),
    queryFn: getCategoryCount,
  });
};
