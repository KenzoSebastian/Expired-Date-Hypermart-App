import { type apiProductType, ProductsAPI } from "@/lib/api";
import { queryOptions } from "@tanstack/react-query";

type categoryProps = {
  category: "expired" | "expiringSoon" | "expiringLater" | "goodProducts";
};

export const getCategory = async ({ category }: categoryProps): Promise<apiProductType> => {
  try {
    const { data } = await ProductsAPI.get(`/productCategories/${category}?page=1&limit=10`);
    return data;
  } catch (error) {
    console.log("Error fetching category in getCategory function:", error);
    throw error;
  }
};

export type getCategoryQueryKeyProps = categoryProps & { isRefreshing: boolean };

export const getCategoryQueryKey = ({ category, isRefreshing }: getCategoryQueryKeyProps) => [
  "category",
  category,
  isRefreshing,
];

export const getCategoryQueryOptions = ({ category, isRefreshing }: getCategoryQueryKeyProps) => {
  return queryOptions({
    queryKey: getCategoryQueryKey({ category, isRefreshing }),
    queryFn: () => getCategory({ category }),
  });
};
