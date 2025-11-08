import { detailStyles } from "@/assets/styles/detail.styles";
import { cardStyles, globalStyles } from "@/assets/styles/global.styles";
import { ErrorView } from "@/components/ErrorView";
import { NavbarDetails } from "@/components/NavbarDetails";
import { SkeletonDetail } from "@/components/SkeletonDetail";
import { COLORS } from "@/constants/Colors";
import { useGetProductsById } from "@/hooks/useGetProductById";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, RefreshControl, ScrollView, Text, View } from "react-native";

export default function DetailProductScreen() {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: Product,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
  } = useGetProductsById({
    params: { id: parseInt(id.split(":")[1]), isRefreshing },
  });

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundApps }}>
      {/* navigation bar */}
      <NavbarDetails title={"detail Product"} />
      <ScrollView
        contentContainerStyle={globalStyles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              setIsRefreshing(true);
              setTimeout(() => {
                setIsRefreshing(false);
              }, 500);
            }}
          />
        }
      >
        {/* content */}
        {isLoadingProduct ? (
          <SkeletonDetail />
        ) : isErrorProduct ? (
          <ErrorView message="Something went wrong!" />
        ) : (
          <View>
            <View
              style={{
                ...cardStyles.container,
                ...detailStyles.wrapperImage,
              }}
            >
              <Image source={require("@/assets/images/dummyPhoto.png")} style={detailStyles.imageProduct} />
            </View>
            <Text style={{ ...globalStyles.headingSection, fontSize: 25 }}>{Product?.data.description}</Text>
            <View style={{ ...detailStyles.badgeExpired, backgroundColor: "black" }}>
              <Text style={{ ...detailStyles.infoDetails, color: "white" }}>
                EXP: {Product?.data.expiredDate}
              </Text>
            </View>
            <Text style={detailStyles.infoDetails}>Quantity: {Product?.data.quantity}</Text>
            <Text style={detailStyles.infoDetails}>SKU: {Product?.data.skuNumber}</Text>
            <Text style={detailStyles.infoDetails}>Input Date: {Product?.data.createdAt}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
