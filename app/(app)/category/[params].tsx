import { errorStyles, globalStyles } from "@/assets/styles/global.styles";
import { CardProduct } from "@/components/CardProduct";
import { NavbarDetails } from "@/components/NavbarDetails";
import { Paginate } from "@/components/Paginate";
import { SkeletonCard } from "@/components/SkeletonCard";
import { COLORS } from "@/constants/Colors";
import { useGetCategory } from "@/hooks/useGetCategory";
import { categoryStatusType, ProductType } from "@/lib/api";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";

const CategoryScreen = () => {
  const router = useRouter();
  const { params } = useLocalSearchParams<{ params: string }>();
  const [categoryStatus, setCategoryStatus] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const {
    data: productList,
    isLoading: isProductListLoading,
    isError: isProductListError,
  } = useGetCategory({
    params: { category: params.split(":")[1] as categoryStatusType, page, isRefreshing },
  });

  useEffect(() => {
    switch (params.split(":")[1]) {
      case "expired":
        setCategoryStatus("Expired Items");
        break;
      case "expiringSoon":
        setCategoryStatus("Expiring Soon Items");
        break;
      case "expiringLater":
        setCategoryStatus("All Items");
        break;
      case "goodProducts":
        setCategoryStatus("Good Products Items");
        break;
      default:
        router.back();
        break;
    }
  }, [params, router]);

  if (!params) return null;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundApps }}>
      {/* navigation bar */}
      <NavbarDetails title={categoryStatus} />
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
        {/* product list */}
        <Text style={{ ...globalStyles.headingSection, fontSize: 33 }}>
          Products ({productList?.meta.totalItems || 0})
        </Text>
        <View style={globalStyles.productListContainer}>
          {isProductListLoading ? (
            Array.from({ length: 10 }).map((_, index) => <SkeletonCard key={index} />)
          ) : isProductListError ? (
            <View style={errorStyles.container}>
              <Image source={require("@/assets/images/error-icon.png")} style={errorStyles.logo} />
              <Text style={errorStyles.text}>Error fetching data, please try again...</Text>
            </View>
          ) : productList!.data.length === 0 ? (
            <View style={errorStyles.container}>
              <Image source={require("@/assets/images/empty-icon.png")} style={errorStyles.logo} />
              <Text style={{ ...globalStyles.headingSection, fontSize: 25 }}>No products found...</Text>
            </View>
          ) : (
            productList!.data.map((product: ProductType) => <CardProduct key={product.id} {...product} fnOnPress={() => router.push(`/detail/:${product.id}`)} />)
          )}
        </View>
        {/* pagination */}
        {!isProductListLoading && !isProductListError && productList!.data.length > 0 && productList!.meta.totalPages > 1 && (
          <Paginate
            page={productList!.meta.page}
            setPage={setPage}
            totalPages={productList!.meta.totalPages}
            productList={productList!}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default CategoryScreen;
