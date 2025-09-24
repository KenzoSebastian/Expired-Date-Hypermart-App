import { homeStyles, InventorySectionStyles } from "@/assets/styles/home.style";
import { ItemInventoryGrid } from "@/components/ItemInventoryGrid";
import { NavbarComponent } from "@/components/Navbar";
import { COLORS } from "@/constants/Colors";
import { fetchProducts } from "@/services/ProductsAPI.244";
import { Button } from "@react-navigation/elements";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

const MainScreen = () => {
  const [products, setProducts] = useState<any>([]);

  const handleFetchProducts = async () => {
    const { data } = await fetchProducts();
    setProducts(data);

  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundApps }}>
      {/* navigation bar */}
      <NavbarComponent />

      <ScrollView
        contentContainerStyle={homeStyles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* grid of categories */}
        <Text style={homeStyles.headingSection}>Inventory Overview</Text>
        <View style={InventorySectionStyles.InventoryOverViewGrid}>
          <ItemInventoryGrid
            backgroundColor="#1E1E1E"
            icon="close"
            heading="Expired"
            qty={10}
            period="<0"
            onPress={() => console.log("Category 1 Pressed")}
          />
          <ItemInventoryGrid
            backgroundColor="#E7362D"
            icon="hourglass-outline"
            heading="Expiring Soon"
            qty={21}
            period="<7"
            onPress={() => console.log("Category 2 Pressed")}
          />
          <ItemInventoryGrid
            backgroundColor="#F78910"
            icon="timer-outline"
            heading="Expiring Later"
            qty={34}
            period="<7-14"
            onPress={() => console.log("Category 3 Pressed")}
          />
          <ItemInventoryGrid
            backgroundColor="#02B656"
            icon="checkmark"
            heading="Good Products"
            qty={252}
            period=">14"
            onPress={() => console.log("Category 4 Pressed")}
          />
        </View>
        {/* list of products */}
        <Button onPress={handleFetchProducts}>fetching products</Button>
        {products.map((product: any) => (
          <View key={product.id} style={{ padding: 10 }}>
            <Text style={{ color: "black" }}>{product.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MainScreen;
