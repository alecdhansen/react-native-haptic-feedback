import React from "react";
import { View, Animated, Text, StyleSheet } from "react-native";

import type { HapticDebugEvent } from "./types";

let showHapticDebug: (event: HapticDebugEvent) => void = () => {};

export function setHapticDebugEvent(event: HapticDebugEvent) {
  showHapticDebug(event);
}

export default function HapticDebugOverlay(): JSX.Element | null {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const lastEvent = React.useRef<HapticDebugEvent | null>(null);

  React.useEffect(() => {
    showHapticDebug = (event: HapticDebugEvent) => {
      lastEvent.current = event;
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    };
  }, []);

  if (!__DEV__) return null;

  return (
    <Animated.View style={[$style.container, { opacity }]}>
      <View style={{ opacity: 1 }}>
        <Text style={$style.text}>
          Haptic: {lastEvent.current?.type}
          {lastEvent.current?.options &&
            "\nOptions: " + JSON.stringify(lastEvent.current.options, null, 2)}
        </Text>
      </View>
    </Animated.View>
  );
}

const $style = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100,
    right: 20,
    backgroundColor: "black",
    padding: 8,
    borderRadius: 8,
    width: 200,
  },
  text: {
    color: "white",
    fontSize: 12,
  },
});
