import { checkUserToken } from "@/services/checkUserToken";
import { getPushTokenNotification } from "@/utils/getPushTokenNotification";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import { PropsWithChildren, useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const PushNotificationManager: React.FC<PropsWithChildren<object>> = ({ children }) => {
  const { isSignedIn, userId } = useAuth();
  const { user } = useUser();

  const { mutateAsync: checkUserTokenMutation } = useMutation({
    mutationFn: checkUserToken,
  });

  useEffect(() => {
    if (!isSignedIn || !userId || !user) return;

    // Get push token
    getPushTokenNotification().then(async (tokenNotif) => {
      const checkUserTokenResult = await checkUserTokenMutation({
        userId,
        username: user.username!,
        expoPushToken: tokenNotif!,
      });

      console.log("checkUserTokenResult", checkUserTokenResult);
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
  }, [isSignedIn, userId, user]);

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
