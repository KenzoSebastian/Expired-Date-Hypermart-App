import { globalStyles } from "@/assets/styles/global.styles";
import { CardNotification } from "@/components/CardNotification";
import { ErrorView } from "@/components/ErrorView";
import { NavbarDetails } from "@/components/NavbarDetails";
import { SkeletonCardNotif } from "@/components/SkeletonCardNotif";
import { COLORS } from "@/constants/Colors";
import { UserContext } from "@/context/UserContext";
import { useDeleteNotification } from "@/hooks/useDeleteNotification";
import { useGetNotification } from "@/hooks/useGetNotification";
import { useUpdateSeenNotification } from "@/hooks/useUpdateSeenNotification";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

const headerNotificationsScreen = () => {
  return (
    <Text style={{ ...globalStyles.headingSection, fontSize: 33, marginTop: 25, marginBottom: 30 }}>
      System Alerts
    </Text>
  );
};

const footerNotificationsScreen = () => <View style={{ height: 75 }} />;

export default function NotificationScreen() {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const {
    data: notifications,
    isLoading: isLoadingNotifications,
    isError: isErrorNotifications,
    refetch: refetchNotifications,
  } = useGetNotification({
    params: { userId: user!.id, isRefreshing },
  });

  const [isLoading, setIsLoading] = useState<boolean>(isLoadingNotifications);
  useEffect(() => setIsLoading(isLoadingNotifications), [isLoadingNotifications]);

  const onRefresh = async () => {
    setIsRefreshing(true);
    setIsLoading(true);

    await refetchNotifications();

    setIsRefreshing(false);
    setIsLoading(false);
  };

  const { mutateAsync: updateSeenNotification } = useUpdateSeenNotification({
    mutationConfig: {
      onSuccess: () => {
        refetchNotifications();
      },
    },
  });

  const { mutateAsync: deleteNotification } = useDeleteNotification({
    mutationConfig: {
      onSuccess: () => {
        refetchNotifications();
      },
    },
  });

  const handleTapNotification = async (id: string) => {
    const response = await updateSeenNotification({ id });
    if (response.status === "success") {
      router.push(`/detail/:${response.data[0].productId}`);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    setIsLoading(true);
    const response = await deleteNotification({ id });
    if (response.status === "success") {
      refetchNotifications();
    }
    setIsLoading(false);
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundApps }}>
      {isLoading || isErrorNotifications || notifications?.data.length === 0 ? (
        <>
          {/* navigation bar */}
          <NavbarDetails title={"Notifications"} />
          <ScrollView
            contentContainerStyle={globalStyles.scrollViewContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
          >
            {/* notification content */}
            <Text style={{ ...globalStyles.headingSection, fontSize: 33 }}>System Alerts</Text>
            <View style={globalStyles.ListContainer}>
              {isLoading && Array.from({ length: 10 }).map((_, index) => <SkeletonCardNotif key={index} />)}
              {isErrorNotifications && <ErrorView message={"Error fetching notifications."} />}
              {notifications?.data.length === 0 && (
                <Text style={{ ...globalStyles.headingSection, fontSize: 25 }}>No notifications found</Text>
              )}
            </View>
          </ScrollView>
        </>
      ) : (
        <View style={{ height: "100%" }}>
          <NavbarDetails title={"Notifications"} />
          <View style={{ ...globalStyles.scrollViewContainer, height: "100%", paddingTop: 0 }}>
            <SwipeListView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={notifications?.data || []}
              renderItem={({ item }) => (
                <CardNotification {...item} fnOnPress={() => handleTapNotification(item.id)} />
              )}
              renderHiddenItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    height: 120,
                    backgroundColor: "red",
                    paddingRight: 20,
                    borderRadius: 7,
                  }}
                  onPress={() => handleDeleteNotification(item.id)}
                  activeOpacity={0.8}
                >
                  <Text style={{ ...globalStyles.headingSection, color: "white" }}>Delete</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
              refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
              rightOpenValue={-75}
              ListFooterComponent={footerNotificationsScreen}
              ListHeaderComponent={headerNotificationsScreen}
              disableRightSwipe={true}
            />
          </View>
        </View>
      )}
    </View>
  );
}
