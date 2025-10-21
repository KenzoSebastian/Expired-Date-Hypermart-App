import { footerStyles } from "@/assets/styles/global.styles";
import { COLORS } from "@/constants/Colors";
import { apiProductType } from "@/lib/api";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type PaginateProps = {
  page: number;
  productList: apiProductType;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
};

export const Paginate = ({ page, setPage, totalPages, productList }: PaginateProps) => {
  return (
    <View style={footerStyles.footerContainer}>
      <TouchableOpacity
        activeOpacity={0}
        disabled={productList!.meta.hasPrevPage === false}
        style={{
          ...footerStyles.pageBox,
          backgroundColor:
            productList!.meta.hasPrevPage === false ? COLORS.disableButton : COLORS.backgroundUtils,
          borderColor: productList!.meta.hasPrevPage === false ? "gray" : COLORS.border,
        }}
        onPress={() => setPage(productList!.meta.page - 1)}
      >
        <Ionicons
          name="chevron-back"
          size={20}
          style={{ opacity: productList!.meta.hasPrevPage === false ? 0.5 : 1 }}
        />
      </TouchableOpacity>

      <View>
        <Text>
          {page} / {totalPages}
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0}
        disabled={productList!.meta.hasNextPage === false}
        style={{
          ...footerStyles.pageBox,
          backgroundColor:
            productList!.meta.hasNextPage === false ? COLORS.disableButton : COLORS.backgroundUtils,
          borderColor: productList!.meta.hasNextPage === false ? "gray" : COLORS.border,
        }}
        onPress={() => setPage(productList!.meta.page + 1)}
      >
        <Ionicons
          name="chevron-forward"
          size={20}
          style={{ opacity: productList!.meta.hasNextPage === false ? 0.5 : 1 }}
        />
      </TouchableOpacity>
    </View>
  );
};
