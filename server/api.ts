import axios from "axios";

export const ProductsAPI = axios.create({
  baseURL: "https://api-expired-date-hypermart-app-1cq4.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
