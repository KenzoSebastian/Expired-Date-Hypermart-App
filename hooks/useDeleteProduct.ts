import { MutationConfig } from "@/lib/query-client";
import { deleteProduct, type deleteProductRequest } from "@/services/deleteProduct";
import { useMutation } from "@tanstack/react-query";

type useDeleteProductProps = {
  mutationConfig?: MutationConfig<typeof deleteProduct>;
};

export const useDeleteProduct = ({ mutationConfig }: useDeleteProductProps = {}) => {
  return useMutation({
    ...mutationConfig,
    mutationFn: (params: deleteProductRequest) => deleteProduct(params),
  });
};
