import { useEffect, useState } from "react";
import { Easing, useAnimatedStyle, withTiming } from "react-native-reanimated";

export const useAnimatedOrder = () => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [textorder, setTextOrder] = useState<boolean>(false);

  useEffect(() => {
    if (textorder) {
      setTimeout(() => {
        setTextOrder(false);
      }, 1000);
    }
  }, [textorder]);

  const config = {
    duration: 300,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const animatesStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(textorder ? 25 : 0, config) },
        { scaleY: withTiming(textorder ? 1 : 0, config) },
        { translateX: withTiming(35, config) },
      ],
      opacity: withTiming(textorder ? 1 : 0, config),
    };
  });

  return { order, setOrder, setTextOrder, animatesStyle };
};
