import { cardStyles, skeletonProps } from "@/assets/styles/global.styles";
import { skeletonStyles } from "@/assets/styles/skeleton.styles";
import SkeletonLoading from "expo-skeleton-loading";
import React, { ElementType } from "react";
import { View } from "react-native";

const SkeletonLoadingElement: ElementType<typeof SkeletonLoading> | any = SkeletonLoading;

export const SkeletonCardNotif = () => {
  return (
    <View style={{ ...cardStyles.container, gap: 10 }}>
      <SkeletonLoadingElement {...skeletonProps}>
        <View style={{ width: 80, height: 80, ...skeletonStyles.dummyContent }} />
      </SkeletonLoadingElement>
      <View style={{ flex: 1, gap: 5, width: "100%", justifyContent: "center" }}>
        <SkeletonLoadingElement {...skeletonProps}>
          <View
            style={{
              width: 175,
              height: 15,
              marginBottom: 15,
              ...skeletonStyles.dummyContent,
            }}
          />
        </SkeletonLoadingElement>
        <SkeletonLoadingElement {...skeletonProps}>
          <View
            style={{
              width: 170,
              height: 8,
              ...skeletonStyles.dummyContent,
            }}
          />
        </SkeletonLoadingElement>
        <SkeletonLoadingElement {...skeletonProps}>
          <View
            style={{
              width: 105,
              height: 8,
              ...skeletonStyles.dummyContent,
            }}
          />
        </SkeletonLoadingElement>
        <SkeletonLoadingElement {...skeletonProps}>
          <View
            style={{
              width: 50,
              height: 8,
              alignSelf: "flex-end",
              marginTop: 10,
              ...skeletonStyles.dummyContent,
            }}
          />
        </SkeletonLoadingElement>
      </View>
    </View>
  );
};
