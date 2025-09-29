import { homeStyles, InventorySectionStyles } from "@/assets/styles/home.style";
import { ItemInventoryGrid } from "@/components/ItemInventoryGrid";
import { NavbarComponent } from "@/components/Navbar";
import { COLORS } from "@/constants/Colors";
import { getCountProductsByCategory } from "@/services/ProductsAPI.244";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

const MainScreen = () => {
  const [productCounts, setProductCounts] = useState({
    expired: 0,
    expiringSoon: 0,
    expiringLater: 0,
    goodProducts: 0,
  });

  useEffect(() => {
    const fetchDataCategories = async () => {
      const data = await getCountProductsByCategory();
      setProductCounts(data);
    };
    fetchDataCategories();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundApps }}>
      {/* navigation bar */}
      <NavbarComponent />

      <ScrollView contentContainerStyle={homeStyles.scrollViewContainer} showsVerticalScrollIndicator={false}>
        {/* grid of categories */}
        <Text style={homeStyles.headingSection}>Inventory Overview</Text>
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
      </ScrollView>
    </View>
  );
};

export default MainScreen;
