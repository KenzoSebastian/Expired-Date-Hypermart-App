import { globalStyles } from "@/assets/styles/global.styles";
import { CardProduct } from "@/components/CardProduct";
import { ErrorView } from "@/components/ErrorView";
import { NavbarComponent } from "@/components/Navbar";
import { SkeletonCard } from "@/components/SkeletonCard";
import { COLORS } from "@/constants/Colors";
import { useGetProducts } from "@/hooks/useGetProducts";
import { useGetSearchProducts } from "@/hooks/useGetSearchProducts";
import { ProductType } from "@/lib/api";
import { randomParams } from "@/utils/randomParams";
import { Ionicons } from "@expo/vector-icons";
import { useDebounce } from "@uidotdev/usehooks";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

const generateRandomParams = randomParams();

const SearchScreen = () => {
  const router = useRouter();
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
    <View style={globalStyles.container}>
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
        <View style={globalStyles.ListContainer}>
          {isProductListLoading || isProductSearchLoading ? (
            Array.from({ length: 5 }).map((_, index) => <SkeletonCard key={index} />)
          ) : isProductListError || isProductSearchError ? (
            <ErrorView message="Failed to fetch products"/>
          ) : searchQuery === "" ? (
            productList!.data.map((product: ProductType) => (
              <CardProduct
                key={product.id}
                {...product}
                fnOnPress={() => router.push(`/detail/:${product.id}`)}
              />
            ))
          ) : productSearch!.data.length === 0 ? (
            <Text style={{ ...globalStyles.headingSection, fontSize: 25 }}>No product found</Text>
          ) : (
            productSearch!.data.map((product: ProductType) => (
              <CardProduct
                key={product.id}
                {...product}
                fnOnPress={() => router.push(`/detail/:${product.id}`)}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
