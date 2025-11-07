import { globalStyles } from "@/assets/styles/global.styles";
import { CardNotification } from "@/components/CardNotification";
import { ErrorView } from "@/components/ErrorView";
import { NavbarDetails } from "@/components/NavbarDetails";
import { SkeletonCardNotif } from "@/components/SkeletonCardNotif";
import { COLORS } from "@/constants/Colors";
import { UserContext } from "@/context/UserContext";
import { useDeleteNotification } from "@/hooks/useDeleteNotification";
import { useGetNotification } from "@/hooks/useGetNotification";
import React, { useContext, useState } from "react";
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

const NotificationScreen = () => {
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

  const onRefresh = async () => {
    setIsRefreshing(true);
    await refetchNotifications();
    setIsRefreshing(false);
  };

  const { mutateAsync: deleteNotification } = useDeleteNotification({
    mutationConfig: {
      onSuccess: () => {
        refetchNotifications();
      },
    },
  });

  const handleDeleteNotification = async (id: string) => {
    const response = await deleteNotification({ id });
    console.log(response);
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundApps }}>
      {isLoadingNotifications || isErrorNotifications || notifications?.data.length === 0 ? (
        <>
          {/* navigation bar */}
          <NavbarDetails title={"Notifications"} />
          <ScrollView
            contentContainerStyle={globalStyles.scrollViewContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
              />
            }
          >
            {/* notification content */}
            <Text style={{ ...globalStyles.headingSection, fontSize: 33 }}>System Alerts</Text>
            <View style={globalStyles.ListContainer}>
              {isLoadingNotifications &&
                Array.from({ length: 10 }).map((_, index) => <SkeletonCardNotif key={index} />)}
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
                <View style={{ backgroundColor: "black", height: 120, marginBottom: 10, borderRadius: 7 }}>
                  <CardNotification {...item} fnOnPress={() => {}} />
                </View>
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
        // <View>
        //   {/* navigation bar */}
        //   <NavbarDetails title={"Notifications"} />
        //   <View style={globalStyles.scrollViewContainer}>
        //     {/* notification content */}
        //     <Text style={{ ...globalStyles.headingSection, fontSize: 33 }}>System Alerts</Text>

        //   </View>
        // </View>
      )}
    </View>
  );
};

export default NotificationScreen;
