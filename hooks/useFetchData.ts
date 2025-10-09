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

      const [dataProductCounts, { data: dataProductList }] = await Promise.all([
        queryProductCounts,
        queryProductList,
      ]);

      setProductList(dataProductList);
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
    error,
    setError,
    selectedCategory,
    setSelectedCategory,
    fetchCoreData,
  };
};
