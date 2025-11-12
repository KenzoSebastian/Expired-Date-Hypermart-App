import { MutationConfig } from "@/lib/query-client";
import { updateQuantityProduct, updateQuantityProductRequest } from "@/services/updateQuantityProduct";
import { useMutation } from "@tanstack/react-query";

type useUpdateQuantityProductProps = {
  mutationConfig?: MutationConfig<typeof updateQuantityProduct>;
};

export const useUpdateQuantityProduct = ({ mutationConfig }: useUpdateQuantityProductProps = {}) => {
  return useMutation({
    ...mutationConfig,
    mutationFn: (params: updateQuantityProductRequest) => updateQuantityProduct(params),
  });
};
