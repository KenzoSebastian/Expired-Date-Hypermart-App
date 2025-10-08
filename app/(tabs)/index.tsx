import { errorStyles } from "@/assets/styles/error.styles";
import { homeStyles, InventorySectionStyles, productListSectionStyles } from "@/assets/styles/home.style";
import CardProduct from "@/components/CardProduct";
import { ItemInventoryGrid } from "@/components/ItemInventoryGrid";
import { NavbarComponent } from "@/components/Navbar";
import SkeletonCard from "@/components/SkeletonCard";
import { COLORS } from "@/constants/Colors";
import { fetchAllProducts, getCountProductsByCategory } from "@/services/ProductsAPI.244";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import Animated, { Easing, useAnimatedStyle, withTiming } from "react-native-reanimated";

const MainScreen = () => {
  const [productCounts, setProductCounts] = useState({
    expired: 0,
    expiringSoon: 0,
    expiringLater: 0,
    goodProducts: 0,
  });
  const [productList, setProductList] = useState([]);
  const [error, setError] = useState<boolean>(false);
  const [sorting, setSorting] = useState<"asc" | "desc">("asc");
  const [textSorting, setTextSorting] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<"description" | "expiredDate" | "createdAt">(
    "expiredDate"
  );

  const fetchCoreData = async () => {
    setProductCounts({
      expired: 0,
      expiringSoon: 0,
      expiringLater: 0,
      goodProducts: 0,
    });
    setError(false);
    setProductList([]);

    try {
      const queryProductCounts = getCountProductsByCategory();
      const queryProductList = fetchAllProducts(selectedCategory);

      const [dataProductCounts, { data: dataProductList }] = await Promise.all([
        queryProductCounts,
        queryProductList,
      ]);

      setProductList(dataProductList);
      setProductCounts(dataProductCounts);
    } catch (error) {
      setError(true);
      console.log("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchCoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      setError(false);
      setProductList([]);
      try {
        const { data } = await fetchAllProducts(selectedCategory);
        setProductList(data);
      } catch (error) {
        setError(true);
        console.log("Error fetching data:", error);
      }
    })();
  }, [selectedCategory]);

  useEffect(() => {
    if (textSorting) {
      setTimeout(() => {
        setTextSorting(false);
      }, 2000);
    }
  }, [textSorting]);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const animatesStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(textSorting ? 25 : 0, config) },
        { translateX: withTiming(35, config) },
      ],
      opacity: withTiming(textSorting ? 1 : 0, config),
    };
  });

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundApps }}>
      {/* navigation bar */}
      <NavbarComponent />
      <ScrollView
        contentContainerStyle={homeStyles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={false} onRefresh={fetchCoreData} />}
      >
        {/* grid of categories */}
        <Text style={{ ...homeStyles.headingSection, fontSize: 33 }}>Inventory Overview</Text>
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
        <View style={productListSectionStyles.headingContainer}>
          <Text style={{ ...homeStyles.headingSection, fontSize: 25 }}>List of Products</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, position: "relative" }}>
            <Animated.Text style={[{ fontSize: 15, fontWeight: "semibold" }, animatesStyle]}>
              {sorting}
            </Animated.Text>
            <TouchableOpacity
              onPress={() => {
                setSorting(sorting === "asc" ? "desc" : "asc");
                setTextSorting(true);
              }}
              activeOpacity={0.6}
              disabled={productList.length === 0}
            >
              {sorting === "asc" ? (
                <Image source={require(`@/assets/images/asc.png`)} style={{ width: 30, height: 30 }} />
              ) : (
                <Image source={require(`@/assets/images/desc.png`)} style={{ width: 30, height: 30 }} />
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
      </ScrollView>
    </View>
  );
};

export default MainScreen;
