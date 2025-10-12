/* eslint-disable react-hooks/exhaustive-deps */
import { errorStyles } from "@/assets/styles/error.styles";
import { globalStyles } from "@/assets/styles/global.styles";
import {
  footerStyles,
  InventorySectionStyles,
  productListSectionStyles
} from "@/assets/styles/home.style";
import CardProduct from "@/components/CardProduct";
import { ItemInventoryGrid } from "@/components/ItemInventoryGrid";
import { NavbarComponent } from "@/components/Navbar";
import SkeletonCard from "@/components/SkeletonCard";
import { COLORS } from "@/constants/Colors";
import { useAnimatedOrder } from "@/hooks/useAnimatedOrder";
import { useFetchData } from "@/hooks/useFetchData";
import { fetchAllProducts } from "@/services/ProductsAPI.244";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useEffect } from "react";
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import Animated from "react-native-reanimated";

const MainScreen = () => {
  const { order, setOrder, setTextOrder, animatesStyle } = useAnimatedOrder();

  const {
    productCounts,
    productList,
    setProductList,
    metaData,
    setMetaData,
    error,
    setError,
    selectedCategory,
    setSelectedCategory,
    fetchCoreData,
  } = useFetchData();

  useEffect(() => {
    fetchCoreData(order);
  }, []);

  useEffect(() => {
    (async () => {
      setError(false);
      setProductList([]);
      try {
        const { data, meta } = await fetchAllProducts(selectedCategory, order);
        setProductList(data);
        setMetaData(meta);
      } catch (error) {
        setError(true);
        console.log("Error fetching data:", error);
      }
    })();
  }, [selectedCategory, order]);

  const handleNextPage = async (goToPage: number) => {
    setProductList([]);
    setError(false);
    try {
      const { data, meta } = await fetchAllProducts(selectedCategory, order, goToPage);
      setProductList(data);
      setMetaData(meta);
    } catch (error) {
      setError(true);
      console.log("Error fetching data:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundApps }}>
      {/* navigation bar */}
      <NavbarComponent />
      <ScrollView
        contentContainerStyle={globalStyles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={false} onRefresh={() => fetchCoreData(order)} />}
      >
        {/* grid of categories */}
        <Text style={{ ...globalStyles.headingSection, fontSize: 33 }}>Inventory Overview</Text>
        <View style={InventorySectionStyles.InventoryOverViewGrid}>
          <ItemInventoryGrid
            backgroundColor="#1E1E1E"
            icon="close"
            heading="Expired"
            qty={productCounts.expired}
            period="<0"
            onPress={() => console.log("Category 1 Pressed")}
          />
          <ItemInventoryGrid
            backgroundColor="#E7362D"
            icon="hourglass-outline"
            heading="Expiring Soon"
            qty={productCounts.expiringSoon}
            period="<7"
            onPress={() => console.log("Category 2 Pressed")}
          />
          <ItemInventoryGrid
            backgroundColor="#F78910"
            icon="timer-outline"
            heading="Expiring Later"
            qty={productCounts.expiringLater}
            period="<7-14"
            onPress={() => console.log("Category 3 Pressed")}
          />
          <ItemInventoryGrid
            backgroundColor="#02B656"
            icon="checkmark"
            heading="Good Products"
            qty={productCounts.goodProducts}
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
              disabled={productList.length === 0}
            >
              {order === "asc" ? (
                <Image
                  source={require(`@/assets/images/asc.png`)}
                  style={{ width: 30, height: 30, opacity: productList.length === 0 ? 0.5 : 1 }}
                />
              ) : (
                <Image
                  source={require(`@/assets/images/desc.png`)}
                  style={{ width: 30, height: 30, opacity: productList.length === 0 ? 0.5 : 1 }}
                />
              )}
            </TouchableOpacity>

            <SelectList
              setSelected={(val: "description" | "expiredDate" | "createdAt") => setSelectedCategory(val)}
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
          {productList.length > 0 ? (
            productList.map((product: any) => <CardProduct key={product.id} {...product} />)
          ) : error ? (
            <View style={errorStyles.container}>
              <Image source={require("@/assets/images/error-icon.png")} style={errorStyles.logo} />
              <Text style={errorStyles.text}>Error fetching data, please try again...</Text>
            </View>
          ) : (
            Array.from({ length: 5 }).map((_, index) => <SkeletonCard key={index} />)
          )}
        </View>
        {/* pagination */}
        {!error && productList.length > 0 && (
          <View style={footerStyles.footerContainer}>
            <TouchableOpacity
              activeOpacity={0}
              disabled={metaData.hasPrevPage === false}
              style={{
                ...footerStyles.pageBox,
                backgroundColor:
                  metaData.hasPrevPage === false ? COLORS.disableButton : COLORS.backgroundUtils,
                borderColor: metaData.hasPrevPage === false ? "gray" : COLORS.border,
              }}
              onPress={() => handleNextPage(metaData.page - 1)}
            >
              <Ionicons
                name="chevron-back"
                size={20}
                style={{ opacity: metaData.hasPrevPage === false ? 0.5 : 1 }}
              />
            </TouchableOpacity>

            <View>
              <Text>
                {metaData.page} / {metaData.totalPages}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0}
              disabled={metaData.hasNextPage === false}
              style={{
                ...footerStyles.pageBox,
                backgroundColor:
                  metaData.hasNextPage === false ? COLORS.disableButton : COLORS.backgroundUtils,
                borderColor: metaData.hasNextPage === false ? "gray" : COLORS.border,
              }}
              onPress={() => handleNextPage(metaData.page + 1)}
            >
              <Ionicons
                name="chevron-forward"
                size={20}
                style={{ opacity: metaData.hasNextPage === false ? 0.5 : 1 }}
              />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MainScreen;
