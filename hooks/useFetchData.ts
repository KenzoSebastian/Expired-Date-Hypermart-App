import { fetchAllProducts, getCountProductsByCategory } from "@/services/ProductsAPI.244";
import { useState } from "react";

export const useFetchData = () => {
  const [productCounts, setProductCounts] = useState({
    expired: 0,
    expiringSoon: 0,
    expiringLater: 0,
    goodProducts: 0,
  });

  const [productList, setProductList] = useState([]);
  const [metaData, setMetaData] = useState<{
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }>({
    page: 0,
    limit: 0,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [error, setError] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<"description" | "expiredDate" | "createdAt">(
    "expiredDate"
  );
  const fetchCoreData = async (order?: "asc" | "desc") => {
    setProductCounts({
      expired: 0,
      expiringSoon: 0,
      expiringLater: 0,
      goodProducts: 0,
    });
    setError(false);
    setProductList([]);

    try {
      const queryProductCounts = getCountProductsByCategory();
      const queryProductList = fetchAllProducts(selectedCategory, order);

      const [dataProductCounts, { data: dataProductList, meta }] = await Promise.all([
        queryProductCounts,
        queryProductList,
      ]);

      setProductList(dataProductList);
      setMetaData(meta);
      setProductCounts(dataProductCounts);
    } catch (error) {
      setError(true);
      console.log("Error fetching data:", error);
    }
  };

  return {
    productCounts,
    productList,
    setProductList,
    metaData,
    setMetaData,
    error,
    setError,
    selectedCategory,
    setSelectedCategory,
    fetchCoreData,
  };
};
