/* eslint-disable react-hooks/exhaustive-deps */
import { UserContext, UserContextType } from "@/context/UserContext";
import { checkUserToken } from "@/services/checkUserToken";
import { formatDate } from "@/utils/dateFormatter";
import { getPushTokenNotification } from "@/utils/getPushTokenNotification";
import { numberSplit } from "@/utils/numberSplit";
import { useAuth, useSession } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import { PropsWithChildren, useContext, useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const PushNotificationManager: React.FC<PropsWithChildren<object>> = ({ children }) => {
  const globalUser = useContext<UserContextType | null>(UserContext);
  const { isSignedIn, userId } = useAuth();
  const { session } = useSession();

  const { mutateAsync: checkUserTokenMutation } = useMutation({
    mutationFn: checkUserToken,
  });

  useEffect(() => {
    if (!isSignedIn || !userId || !session) return;

    // Get push token
    getPushTokenNotification().then(async (tokenNotif) => {
      const checkUserTokenResult = await checkUserTokenMutation({
        id: session.user.id,
        username: session.user.username!,
        email: session.user.emailAddresses[0]?.emailAddress!,
        memberSince: formatDate(session.user.createdAt),
        storeCode: Number(numberSplit(session.user.emailAddresses[0].emailAddress)),
        imageUrl: session.user.imageUrl,
        expoPushToken: tokenNotif! as `ExponentPushToken[${string}]`,
      });

      globalUser?.setUser(checkUserTokenResult.data[0]);
      console.log(2322);
    });

    // Notification received listener
    const receivedSubscription = Notifications.addNotificationReceivedListener(({ date, request }) => {
      console.log(`Notification Received date: ${new Date(date)}`);
      console.log(`Notification Received request: ${JSON.stringify(request)}`);
    });

    // notification tap listener
    const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data;
      console.log(`Notification Tapped: ${data}`);
    });

    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }, [isSignedIn, userId, session]);

  return <>{children}</>;
};

// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got mail! 📬",
//       body: "Here is the notification body",
//       data: { data: "goes here", test: { test1: "more data" } },
//     },
//     trigger: {
//       type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
//       seconds: 2,
//     },
//   });
// }
