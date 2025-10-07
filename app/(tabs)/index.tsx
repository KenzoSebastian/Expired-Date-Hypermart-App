import { homeStyles, InventorySectionStyles, productListSectionStyles } from "@/assets/styles/home.style";
import CardProduct from "@/components/CardProduct";
import { ItemInventoryGrid } from "@/components/ItemInventoryGrid";
import { NavbarComponent } from "@/components/Navbar";
import SkeletonCard from "@/components/SkeletonCard";
import { COLORS } from "@/constants/Colors";
import { fetchAllProducts, getCountProductsByCategory } from "@/services/ProductsAPI.244";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

const MainScreen = () => {
  const [productCounts, setProductCounts] = useState({
    expired: 0,
    expiringSoon: 0,
    expiringLater: 0,
    goodProducts: 0,
  });
  const [productList, setProductList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("name");

  const fetchCoreData = async () => {
    setProductCounts({
      expired: 0,
      expiringSoon: 0,
      expiringLater: 0,
      goodProducts: 0,
    });
    setProductList([]);

    try {
      const queryProductCounts = getCountProductsByCategory();
      const queryProductList = fetchAllProducts();

      const [dataProductCounts, { data: dataProductList }] = await Promise.all([
        queryProductCounts,
        queryProductList,
      ]);

      setProductCounts(dataProductCounts);
      setProductList(dataProductList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchCoreData();
  }, []);

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

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
          <SelectList
            setSelected={(val: string) => setSelectedCategory(val)}
            data={[
              { key: "2", value: "name" },
              { key: "3", value: "date created" },
              { key: "4", value: "date expiring" },
            ]}
            save="value"
            search={false}
            arrowicon={<Ionicons name="chevron-down" size={15} color="black" />}
            placeholder="sort by"
            boxStyles={productListSectionStyles.boxTriggerDropdown}
            dropdownStyles={productListSectionStyles.boxDropDown}
            dropdownItemStyles={productListSectionStyles.itemDropDown}
          />
        </View>
        <View style={productListSectionStyles.productListContainer}>
          {productList.length > 0 ? (
            productList.map((product: any) => <CardProduct key={product.id} {...product} />)
          ) : (
            Array.from({ length: 5 }).map((_, index) => <SkeletonCard key={index} />)
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default MainScreen;
