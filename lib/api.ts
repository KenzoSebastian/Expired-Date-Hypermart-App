import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api-expired-date-hypermart-app-1cq4.vercel.app/api",
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

export type UserType = {
  id: string;
  username: string;
  email: string;
  memberSince: string;
  storeCode: number;
  imageUrl: string;
  expoPushToken: `ExponentPushToken[${string}]`;
  createdAt: string;
  updatedAt: string;
};

export type notificationType = {
  id: string;
  userId: string;
  productId: number;
  title: string;
  message: string;
  seen: boolean;
  createdAt: string;
};

export type categoryStatusType = "expired" | "expiringSoon" | "expiringLater" | "goodProducts";

export type apiProductType = {
  status: "success" | "error";
  message: string;
  data: ProductType[];
  meta: MetaType;
};

export type apiProductSearchType = {
  status: "success" | "error";
  message: string;
  data: ProductType[];
  meta: { totalItems: number };
};

export type apiSingleProductType = {
  status: "success" | "error";
  message: string;
  data: ProductType;
};

export type apiUsersType = {
  status: "success" | "error";
  message: string;
  data: UserType[];
};

export type apiNotificationType = {
  status: "success" | "error";
  message: string;
  data: notificationType[];
};
