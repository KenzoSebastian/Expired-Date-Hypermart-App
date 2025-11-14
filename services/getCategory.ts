import { type apiProductType, categoryStatusType, axiosInstance } from "@/lib/api";
import { queryOptions } from "@tanstack/react-query";

type categoryProps = {
  category?: categoryStatusType;
  page?: number;
};

export const getCategory = async ({ category, page }: categoryProps): Promise<apiProductType> => {
  try {
    const { data } = await axiosInstance.get(`/products/categories/${category}?page=${page || 1}&limit=10`);
    return data;
  } catch (error) {
    console.log("Error fetching category in getCategory function:", error);
    throw error;
  }
};

export type getCategoryQueryKeyProps = categoryProps & { isRefreshing?: boolean };

export const getCategoryQueryKey = ({
  category = "expired",
  page = 1,
  isRefreshing = false,
}: getCategoryQueryKeyProps) => ["category", category, page, isRefreshing];

export const getCategoryQueryOptions = ({ category, page, isRefreshing }: getCategoryQueryKeyProps) => {
  return queryOptions({
    queryKey: getCategoryQueryKey({ category, page, isRefreshing }),
    queryFn: () => getCategory({ category, page }),
  });
};
