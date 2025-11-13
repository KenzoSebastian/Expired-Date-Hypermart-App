import { detailStyles } from "@/assets/styles/detail.styles";
import { cardStyles, globalStyles } from "@/assets/styles/global.styles";
import { COLORS } from "@/constants/Colors";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";
import { useUpdateQuantityProduct } from "@/hooks/useUpdateQuantityProduct";
import { queryClient } from "@/lib/query-client";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

type ProductSaleModalProps = {
  isVisible: boolean;
  onClose: () => void;
  productId: number;
  currentQuantity: number;
  refetchProduct: () => void;
};

export const ProductSaleModal = ({
  isVisible,
  onClose,
  productId,
  currentQuantity,
  refetchProduct,
}: ProductSaleModalProps) => {
  const router = useRouter();
  const [soldQuantity, setSoldQuantity] = useState("");
  const max = currentQuantity;

  const { mutateAsync: updateQuantityProduct } = useUpdateQuantityProduct({
    mutationConfig: {
      onSuccess: () => {
        onClose();
        refetchProduct();
      },
    },
  });

  const { mutateAsync: deleteProduct } = useDeleteProduct({
    mutationConfig: {
      onSuccess: () => {
        onClose();
        refetchProduct();
        router.replace("/");
        queryClient.invalidateQueries();
      },
    },
  });

  useEffect(() => {
    if (isVisible) {
      setSoldQuantity("");
    }
  }, [isVisible]);

  const handleMaxPress = () => {
    setSoldQuantity(max.toString());
  };

  const handleConfirmSale = async () => {
    const quantityToReduce = parseInt(soldQuantity, 10);

    if (isNaN(quantityToReduce) || quantityToReduce <= 0) {
      Alert.alert("Input Error", "Please enter a valid number greater than 0.");
      return;
    }

    if (quantityToReduce > max) {
      Alert.alert(
        "Insufficient Stock",
        `The quantity (${quantityToReduce}) exceeds the current stock (${max}).`
      );
      return;
    }

    const remainingQuantity = currentQuantity - quantityToReduce;

    if (remainingQuantity === 0) {
      await deleteProduct({ id: productId });
    } else {
      await updateQuantityProduct({ id: productId, quantity: remainingQuantity });
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={detailStyles.overlayModal}>
        <View style={detailStyles.modalBox}>
          <Text style={{ ...globalStyles.headingSection, fontSize: 25 }}>Sales Input</Text>
          <Text style={{ marginBottom: 15, marginTop: 5, ...cardStyles.subHeading, fontSize: 13 }}>
            Current Stock: {currentQuantity}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <TextInput
              style={{ ...globalStyles.textField, flex: 1, borderWidth: 1 }}
              keyboardType="numeric"
              placeholder="Enter Quantity Sold"
              value={soldQuantity}
              onChangeText={setSoldQuantity}
            />
            <TouchableOpacity
              onPress={handleMaxPress}
              style={detailStyles.maxButtonModal}
              activeOpacity={0.7}
            >
              <Text style={detailStyles.textButtonModal}>MAX</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
            <TouchableOpacity
              onPress={onClose}
              style={{ ...detailStyles.buttonFooterModal, backgroundColor: COLORS.error }}
            >
              <Text style={detailStyles.textButtonModal}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirmSale}
              style={{ ...detailStyles.buttonFooterModal, backgroundColor: COLORS.secondary }}
            >
              <Text style={detailStyles.textButtonModal}>Confirm Sale</Text>
            </TouchableOpacity>
          </View>

          {
            /* <Button
            title="Confirm Sale"
            onPress={handleConfirmSale}
            color="#007AFF"

            /* disabled={isLoading} */
            // />
            // <View style={{ marginTop: 10 }}>
            //   <Button title="Cancel" onPress={onClose} color="#FF3B30" />
            // </View> */}
          }
        </View>
      </View>
    </Modal>
  );
};
