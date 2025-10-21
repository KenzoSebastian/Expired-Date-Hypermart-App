import { globalStyles, errorStyles } from "@/assets/styles/global.styles";
import { CardProduct } from "@/components/CardProduct";
import { NavbarComponent } from "@/components/Navbar";
import { SkeletonCard } from "@/components/SkeletonCard";
import { COLORS } from "@/constants/Colors";
import { useGetProducts } from "@/hooks/useGetProduct";
import { useGetSearchProducts } from "@/hooks/useGetSearchProducts";
import { ProductType } from "@/lib/api";
import { randomParams } from "@/utils/randomParams";
import { Ionicons } from "@expo/vector-icons";
import { useDebounce } from "@uidotdev/usehooks";
import { Image } from "expo-image";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

const generateRandomParams = randomParams();

const SearchScreen = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const searchQuery = useDebounce(searchValue, 500);
  const {
    data: productList,
    isLoading: isProductListLoading,
    isError: isProductListError,
  } = useGetProducts({ params: generateRandomParams });

  const {
    data: productSearch,
    isLoading: isProductSearchLoading,
    isError: isProductSearchError,
  } = useGetSearchProducts({ params: { searchQuery } });

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundApps }}>
      {/* navigation bar */}
      <NavbarComponent />
      <ScrollView
        contentContainerStyle={globalStyles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* search content */}
        <Text style={{ ...globalStyles.headingSection, fontSize: 33 }}>Explore Your Stock</Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: COLORS.text,
            ...globalStyles.wrapperInput,
          }}
        >
          <Ionicons name="search" size={24} color="#000000" />
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
            }}
            placeholder="Search product..."
            focusable={true}
            autoCapitalize="none"
            value={searchValue}
            onChangeText={setSearchValue}
          />
        </View>
        <View style={globalStyles.productListContainer}>
          {isProductListLoading || isProductSearchLoading ? (
            Array.from({ length: 5 }).map((_, index) => <SkeletonCard key={index} />)
          ) : isProductListError || isProductSearchError ? (
            <View style={errorStyles.container}>
              <Image source={require("@/assets/images/error-icon.png")} style={errorStyles.logo} />
              <Text style={errorStyles.text}>Error fetching data, please try again...</Text>
            </View>
          ) : searchQuery === "" ? (
            productList!.data.map((product: ProductType) => <CardProduct key={product.id} {...product} />)
          ) : productSearch!.data.length === 0 ? (
            <Text style={{ ...globalStyles.headingSection, fontSize: 25 }}>No product found</Text>
          ) : (
            productSearch!.data.map((product: ProductType) => <CardProduct key={product.id} {...product} />)
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
