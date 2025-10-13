import { errorStyles } from "@/assets/styles/error.styles";
import { globalStyles } from "@/assets/styles/global.styles";
import { footerStyles, InventorySectionStyles, productListSectionStyles } from "@/assets/styles/home.style";
import CardProduct from "@/components/CardProduct";
import { ItemInventoryGrid } from "@/components/ItemInventoryGrid";
import { NavbarComponent } from "@/components/Navbar";
import SkeletonCard from "@/components/SkeletonCard";
import { COLORS } from "@/constants/Colors";
import { useAnimatedOrder } from "@/hooks/useAnimatedOrder";
import { useGetCategoryCount } from "@/hooks/useGetCategoryCount";
import { useGetProducts } from "@/hooks/useGetProduct";
import { useGetReFetchData } from "@/hooks/useGetReFetchData";
import { type ProductType } from "@/lib/api";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import Animated from "react-native-reanimated";

const MainScreen = () => {
  const [sortBy, setSortBy] = useState<"description" | "expiredDate" | "createdAt">("expiredDate");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [page, setPage] = useState(1);

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
    params: { sortBy, order, page, isRefreshing },
  });

  const { mutate: reFetchData } = useGetReFetchData({ params: { sortBy, order, page, setIsRefreshing } });

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundApps }}>
      {/* navigation bar */}
      <NavbarComponent />
      <ScrollView
        contentContainerStyle={globalStyles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => reFetchData({order, sortBy, page})} />}
      >
        {/* grid of categories */}
        <Text style={{ ...globalStyles.headingSection, fontSize: 33 }}>Inventory Overview</Text>
        <View style={InventorySectionStyles.InventoryOverViewGrid}>
          <ItemInventoryGrid
            backgroundColor="#1E1E1E"
            icon="close"
            heading="Expired"
            qty={isProductCountsLoading || isProductCountsError ? 0 : productCounts!.expired}
            period="<0"
            onPress={() => console.log("Category 1 Pressed")}
          />
          <ItemInventoryGrid
            backgroundColor="#E7362D"
            icon="hourglass-outline"
            heading="Expiring Soon"
            qty={isProductCountsLoading || isProductCountsError ? 0 : productCounts!.expiringSoon}
            period="<7"
            onPress={() => console.log("Category 2 Pressed")}
          />
          <ItemInventoryGrid
            backgroundColor="#F78910"
            icon="timer-outline"
            heading="Expiring Later"
            qty={isProductCountsLoading || isProductCountsError ? 0 : productCounts!.expiringLater}
            period="<7-14"
            onPress={() => console.log("Category 3 Pressed")}
          />
          <ItemInventoryGrid
            backgroundColor="#02B656"
            icon="checkmark"
            heading="Good Products"
            qty={isProductCountsLoading || isProductCountsError ? 0 : productCounts!.goodProducts}
            period=">14"
            onPress={() => console.log("Category 4 Pressed")}
          />
        </View>
        {/* list of products */}
        {/* product list heading */}
        <View style={productListSectionStyles.headingContainer}>
          <Text style={{ ...globalStyles.headingSection, fontSize: 25 }}>List of Products</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, position: "relative" }}>
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
        <View style={productListSectionStyles.productListContainer}>
          {isProductListLoading ? (
            Array.from({ length: 5 }).map((_, index) => <SkeletonCard key={index} />)
          ) : isProductListError ? (
            <View style={errorStyles.container}>
              <Image source={require("@/assets/images/error-icon.png")} style={errorStyles.logo} />
              <Text style={errorStyles.text}>Error fetching data, please try again...</Text>
            </View>
          ) : (
            productList!.data.map((product: ProductType) => <CardProduct key={product.id} {...product} />)
          )}
        </View>
        {/* pagination */}
        {!isProductListLoading && !isProductListError && (
          <View style={footerStyles.footerContainer}>
            <TouchableOpacity
              activeOpacity={0}
              disabled={productList!.meta.hasPrevPage === false}
              style={{
                ...footerStyles.pageBox,
                backgroundColor:
                  productList!.meta.hasPrevPage === false ? COLORS.disableButton : COLORS.backgroundUtils,
                borderColor: productList!.meta.hasPrevPage === false ? "gray" : COLORS.border,
              }}
              onPress={() => setPage(productList!.meta.page - 1)}
            >
              <Ionicons
                name="chevron-back"
                size={20}
                style={{ opacity: productList!.meta.hasPrevPage === false ? 0.5 : 1 }}
              />
            </TouchableOpacity>

            <View>
              <Text>
                {productList!.meta.page} / {productList!.meta.totalPages}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0}
              disabled={productList!.meta.hasNextPage === false}
              style={{
                ...footerStyles.pageBox,
                backgroundColor:
                  productList!.meta.hasNextPage === false ? COLORS.disableButton : COLORS.backgroundUtils,
                borderColor: productList!.meta.hasNextPage === false ? "gray" : COLORS.border,
              }}
              onPress={() => setPage(productList!.meta.page + 1)}
            >
              <Ionicons
                name="chevron-forward"
                size={20}
                style={{ opacity: productList!.meta.hasNextPage === false ? 0.5 : 1 }}
              />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MainScreen;
