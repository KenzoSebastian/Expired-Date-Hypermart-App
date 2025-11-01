import { type apiUsersType } from "@/lib/api";
import { addUser, type addUserRequest } from "./addUser";
import { getUserById } from "./getUserById";
import { updateExpoTokenUser } from "./updateExpoTokenUser";

export const checkUserToken = async ({
  id: userId,
  username,
  email,
  memberSince,
  storeCode,
  imageUrl,
  expoPushToken,
}: addUserRequest): Promise<apiUsersType> => {
  try {
    const fetchUserLoginFromServer = await getUserById({ id: userId });
    if (fetchUserLoginFromServer.data.length === 0) {
      const addUserInServer = await addUser({
        id: userId,
        username,
        email,
        memberSince,
        storeCode,
        imageUrl,
        expoPushToken,
      });
      return addUserInServer;
    }
    if (fetchUserLoginFromServer.data[0].expoPushToken !== expoPushToken) {
      const updateToken = await updateExpoTokenUser({ userId, expoPushToken });
      return updateToken;
    }
    return fetchUserLoginFromServer;
  } catch (error) {
    console.log("Error checking user token in checkUserToken function:", error);
    throw error;
  }
};
