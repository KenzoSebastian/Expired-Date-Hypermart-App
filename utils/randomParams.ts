import { getProductsRequest } from "@/services/getProducts";

export const randomParams = ((): getProductsRequest => {
  const sortByOptions = ["description", "expiredDate", "createdAt"];
  const orderByOptions = ["asc", "desc"];

  const randomSortBy = sortByOptions[Math.floor(Math.random() * sortByOptions.length)];
  const randomOrder = orderByOptions[Math.floor(Math.random() * orderByOptions.length)];
  const randomPage = Math.floor(Math.random() * 10) + 1;

  return {
    sortBy: randomSortBy as getProductsRequest["sortBy"],
    order: randomOrder as getProductsRequest["order"],
    page: randomPage as getProductsRequest["page"],
  };
})();
