import axios from "axios";

export const ProductsAPI = axios.create({
  baseURL: "https://api-expired-date-hypermart-app-1cq4.vercel.app/api/products",
  headers: {
    "Content-Type": "application/json",
  },
});

export type ProductType = {
  id: number;
  sjStmNumber: string;
  skuNumber: number;
  description: string;
  quantity: number;
  expiredDate: string;
  createdAt: string;
  updatedAt: string;
};

export type MetaType = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type apiProductType = {
  status: "success" | "error";
  message: string;
  data: ProductType[];
  meta: MetaType;
};

export type categoryStatusType = "expired" | "expiringSoon" | "expiringLater" | "goodProducts";
