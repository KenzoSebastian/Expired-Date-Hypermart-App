import { detailStyles } from "@/assets/styles/detail.styles";
import { cardStyles, globalStyles } from "@/assets/styles/global.styles";
import { ErrorView } from "@/components/ErrorView";
import { NavbarDetails } from "@/components/NavbarDetails";
import { ProductSaleModal } from "@/components/ProductSaleModal";
import { SkeletonDetail } from "@/components/SkeletonDetail";
import { COLORS } from "@/constants/Colors";
import { useGetProductsById } from "@/hooks/useGetProductById";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function DetailProductScreen() {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const {
    data: Product,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
    refetch: refetchProduct,
  } = useGetProductsById({
    params: { id: parseInt(id.split(":")[1]) },
  });

  const onRefreshHandler = async () => {
    setIsRefreshing(true);
    await refetchProduct();
    setIsRefreshing(false);
  };

  const productData = Product?.data;
  const isDataReady = !isLoadingProduct && !isErrorProduct && productData;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundApps }}>
      <NavbarDetails title={"Detail Product"} />
      <ScrollView
        contentContainerStyle={{ ...globalStyles.scrollViewContainer, flex: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshHandler} />}
      >
        {isLoadingProduct ? (
          <SkeletonDetail />
        ) : isErrorProduct ? (
          <ErrorView message="Something went wrong!" />
        ) : (
          <View style={{ paddingBottom: 100 }}>
            <View
              style={{
                ...cardStyles.container,
                ...detailStyles.wrapperImage,
              }}
            >
              <Image source={require("@/assets/images/dummyPhoto.png")} style={detailStyles.imageProduct} />
            </View>
            <Text style={{ ...globalStyles.headingSection, fontSize: 25, color: COLORS.text }}>
              {productData!.description}
            </Text>
            <View
              style={{
                ...detailStyles.badgeExpired,
                backgroundColor: COLORS.primary,
              }}
            >
              <Text style={{ ...detailStyles.infoDetails, color: "white", fontWeight: "bold" }}>
                EXP: {productData!.expiredDate}
              </Text>
            </View>
            <Text style={{ ...detailStyles.infoDetails, color: COLORS.text }}>
              Quantity: {productData!.quantity}
            </Text>
            <Text style={{ ...detailStyles.infoDetails, color: COLORS.text }}>
              SKU: {productData!.skuNumber}
            </Text>
            <Text style={{ ...detailStyles.infoDetails, color: COLORS.text }}>
              Input Date: {productData!.createdAt}
            </Text>
          </View>
        )}
      </ScrollView>

      {isDataReady && (
        <TouchableOpacity
          style={detailStyles.buttonRecordSales}
          activeOpacity={0.7}
          onPress={() => setIsModalVisible(true)}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            RECORD SALE
          </Text>
        </TouchableOpacity>
      )}

      {isDataReady && (
        <ProductSaleModal
          productId={productData.id}
          currentQuantity={productData.quantity}
          refetchProduct={refetchProduct}
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </View>
  );
}
