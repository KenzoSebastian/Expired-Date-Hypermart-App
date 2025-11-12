import { cardStyles, skeletonProps } from "@/assets/styles/global.styles";
import { skeletonStyles } from "@/assets/styles/skeleton.styles";
import SkeletonLoading from "expo-skeleton-loading";
import React, { ElementType } from "react";
import { View } from "react-native";

const SkeletonLoadingElement: ElementType<typeof SkeletonLoading> | any = SkeletonLoading;

export const SkeletonDetail = () => {
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "space-between",
        flex: 1,
      }}
    >
      <View
        style={{ ...cardStyles.container, justifyContent: "center", paddingVertical: 40, marginBottom: 40 }}
      >
        <SkeletonLoadingElement {...skeletonProps}>
          <View
            style={{
              height: 200,
              width: 200,
              ...skeletonStyles.dummyContent,
            }}
          />
        </SkeletonLoadingElement>
      </View>

      <View style={{ gap: 15 }}>
        <SkeletonLoadingElement {...skeletonProps}>
          <View
            style={{
              width: 330,
              height: 50,
              ...skeletonStyles.dummyContent,
            }}
          />
        </SkeletonLoadingElement>
        <SkeletonLoadingElement {...skeletonProps}>
          <View
            style={{
              width: 230,
              height: 30,
              ...skeletonStyles.dummyContent,
            }}
          />
        </SkeletonLoadingElement>
        <SkeletonLoadingElement {...skeletonProps}>
          <View
            style={{
              width: 150,
              height: 20,
              ...skeletonStyles.dummyContent,
            }}
          />
        </SkeletonLoadingElement>
        <SkeletonLoadingElement {...skeletonProps}>
          <View
            style={{
              width: 170,
              height: 20,
              ...skeletonStyles.dummyContent,
            }}
          />
        </SkeletonLoadingElement>
        <SkeletonLoadingElement {...skeletonProps}>
          <View
            style={{
              width: 200,
              height: 20,
              ...skeletonStyles.dummyContent,
            }}
          />
        </SkeletonLoadingElement>
      </View>
      <SkeletonLoadingElement {...skeletonProps}>
        <View
          style={{
            width: 340,
            height: 65,
            alignSelf: "center",
            ...skeletonStyles.dummyContent,
          }}
        />
      </SkeletonLoadingElement>
    </View>
  );
};
