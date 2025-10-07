import { productListSectionStyles } from "@/assets/styles/home.style";
import { skeletonStyles } from "@/assets/styles/skeleton.styles";
import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import SkeletonLoading from "expo-skeleton-loading";
import React from "react";
import { View } from "react-native";

const skeletonProps = {
  background: COLORS.skeleton,
  highlight: COLORS.backgroundUtils,
};

const SkeletonCard = () => {
  return (
    <View style={{ ...productListSectionStyles.cardProduct }}>
      <View style={{ flex: 1, gap: 5, height: "100%" }}>
        <SkeletonLoading {...skeletonProps}>
          <View
            style={{
              width: 175,
              height: 15,
              marginBottom: 15,
              ...skeletonStyles.dummyContent,
            }}
          />
        </SkeletonLoading>
        <SkeletonLoading {...skeletonProps}>
          <View
            style={{
              width: 75,
              height: 8,
              ...skeletonStyles.dummyContent,
            }}
          />
        </SkeletonLoading>
        <SkeletonLoading {...skeletonProps}>
          <View
            style={{
              width: 105,
              height: 8,
              ...skeletonStyles.dummyContent,
            }}
          />
        </SkeletonLoading>
        <SkeletonLoading {...skeletonProps}>
          <View
            style={{
              width: 140,
              height: 8,
              ...skeletonStyles.dummyContent,
            }}
          />
        </SkeletonLoading>
      </View>
      <SkeletonLoading {...skeletonProps}>
        <Ionicons name="chevron-forward" size={40} color={COLORS.secondary} />
      </SkeletonLoading>
    </View>
  );
};

export default SkeletonCard;
