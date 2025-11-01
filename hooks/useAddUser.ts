import { MutationConfig } from "@/lib/query-client";
import { addUser, type addUserRequest } from "@/services/addUser";
import { useMutation } from "@tanstack/react-query";

type useAddUserProps = {
  mutationConfig?: MutationConfig<typeof addUser>;
  // params: addUserRequest;
};
export const useAddUser = ({ mutationConfig }: useAddUserProps = {}) => {
  return useMutation({
    ...mutationConfig,
    mutationFn: async ({ userId, username, expoPushToken }: addUserRequest) => {
      return await addUser({ userId, username, expoPushToken });
    },
  });
};
