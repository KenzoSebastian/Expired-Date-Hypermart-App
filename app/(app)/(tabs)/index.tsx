import { globalStyles } from "@/assets/styles/global.styles";
import { InventorySectionStyles, productListSectionStyles } from "@/assets/styles/home.style";
import { CardProduct } from "@/components/CardProduct";
import { ErrorView } from "@/components/ErrorView";
import { ItemInventoryGrid } from "@/components/ItemInventoryGrid";
import { NavbarComponent } from "@/components/Navbar";
import { Paginate } from "@/components/Paginate";
import { SkeletonCard } from "@/components/SkeletonCard";
import { COLORS } from "@/constants/Colors";
import { UserContext, UserContextType } from "@/context/UserContext";
import { useAnimatedOrder } from "@/hooks/useAnimatedOrder";
import { useGetCategoryCount } from "@/hooks/useGetCategoryCount";
import { useGetProducts } from "@/hooks/useGetProducts";
import { useGetReFetchData } from "@/hooks/useGetReFetchData";
import { type ProductType } from "@/lib/api";
import { randomParams } from "@/utils/randomParams";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import Animated from "react-native-reanimated";

const generateRandomParams = randomParams();

export default function MainScreen() {
  const router = useRouter();
  const { user } = useContext<UserContextType>(UserContext);
  const [sortBy, setSortBy] = useState<"description" | "expiredDate" | "createdAt">();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [generateRandomParamsState, setGenerateRandomParamsState] = useState(generateRandomParams);

  const { order, setOrder, setTextOrder, animatesStyle } = useAnimatedOrder();
  const {
    data: productCounts,
    isLoading: isProductCountsLoading,
    isError: isProductCountsError,
  } = useGetCategoryCount({ params: { isRefreshing } });

  const {
    data: productList,
    isLoading: isProductListLoading,
    isError: isProductListError,
  } = useGetProducts({
    params: !sortBy ? generateRandomParamsState : { sortBy, order, page, isRefreshing },
  });

  const { mutate: reFetchData } = useGetReFetchData({
    params: !sortBy
      ? { ...generateRandomParamsState, setIsRefreshing, userId: user!.id }
      : { sortBy, order, page, setIsRefreshing, userId: user!.id },
    mutationConfig: { onSuccess: () => setGenerateRandomParamsState(randomParams()) },
  });

  return (
    <View style={globalStyles.container}>
      {/* navigation bar */}
      <NavbarComponent />
      <ScrollView
        contentContainerStyle={globalStyles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => reFetchData({ sortBy, order, page, userId: user!.id })}
          />
        }
      >
        {/* grid of categories */}
        <Text style={{ ...globalStyles.headingSection, fontSize: 33 }}>Inventory Overview</Text>
        <View style={InventorySectionStyles.InventoryOverViewGrid}>
          <ItemInventoryGrid
            backgroundColor={COLORS.backgroundExpired}
            icon="close"
            heading="Expired"
            qty={isProductCountsLoading || isProductCountsError ? 0 : productCounts!.expired}
            period="<0"
            onPress={() => router.push("/category/:expired")}
          />
          <ItemInventoryGrid
            backgroundColor={COLORS.backgroundExpiringSoon}
            icon="hourglass-outline"
            heading="Expiring Soon"
            qty={isProductCountsLoading || isProductCountsError ? 0 : productCounts!.expiringSoon}
            period="<7"
            onPress={() => router.push("/category/:expiringSoon")}
          />
          <ItemInventoryGrid
            backgroundColor={COLORS.backgroundExpiringLater}
            icon="timer-outline"
            heading="Expiring Later"
            qty={isProductCountsLoading || isProductCountsError ? 0 : productCounts!.expiringLater}
            period="<7-14"
            onPress={() => router.push("/category/:expiringLater")}
          />
          <ItemInventoryGrid
            backgroundColor={COLORS.backgroundGoodProducts}
            icon="checkmark"
            heading="Good Products"
            qty={isProductCountsLoading || isProductCountsError ? 0 : productCounts!.goodProducts}
            period=">14"
            onPress={() => router.push("/category/:goodProducts")}
          />
        </View>
        {/* list of products */}
        {/* product list heading */}
        <View style={productListSectionStyles.headingContainer}>
          <Text style={{ ...globalStyles.headingSection, fontSize: 25 }}>List of Products</Text>
          <View style={{ ...productListSectionStyles.headingButtonFilter, position: "relative" }}>
            {sortBy && (
              <View style={productListSectionStyles.headingButtonFilter}>
                <Animated.Text style={[{ fontSize: 15, fontWeight: "semibold" }, animatesStyle]}>
                  {order}
                </Animated.Text>
                <TouchableOpacity
                  onPress={() => {
                    setOrder(order === "asc" ? "desc" : "asc");
                    setTextOrder(true);
                  }}
                  activeOpacity={0.6}
                  disabled={isProductListLoading}
                >
                  {order === "asc" ? (
                    <Image
                      source={require(`@/assets/images/asc.png`)}
                      style={{ width: 30, height: 30, opacity: isProductListLoading ? 0.5 : 1 }}
                    />
                  ) : (
                    <Image
                      source={require(`@/assets/images/desc.png`)}
                      style={{ width: 30, height: 30, opacity: isProductListLoading ? 0.5 : 1 }}
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}

            <SelectList
              setSelected={(val: "description" | "expiredDate" | "createdAt") => setSortBy(val)}
              data={[
                { key: "description", value: "name" },
                { key: "createdAt", value: "date created" },
                { key: "expiredDate", value: "date expiring" },
              ]}
              save="key"
              search={false}
              arrowicon={<Ionicons name="chevron-down" size={15} color="black" />}
              placeholder="sort by"
              boxStyles={productListSectionStyles.boxTriggerDropdown}
              dropdownStyles={productListSectionStyles.boxDropDown}
              dropdownItemStyles={{ ...productListSectionStyles.itemDropDown }}
            />
          </View>
        </View>
        {/* product list content */}
        <View style={globalStyles.ListContainer}>
          {isProductListLoading ? (
            Array.from({ length: 5 }).map((_, index) => <SkeletonCard key={index} />)
          ) : isProductListError ? (
            <ErrorView message="Failed to fetch products" />
          ) : (
            productList!.data.map((product: ProductType) => (
              <CardProduct
                key={product.id}
                {...product}
                fnOnPress={() => router.push(`/detail/:${product.id}`)}
              />
            ))
          )}
        </View>
        {/* pagination */}
        {!isProductListLoading && !isProductListError && productList!.data.length > 0 && sortBy && (
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
}
