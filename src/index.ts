import NativeHapticFeedback from './codegenSpec/NativeHapticFeedback';
import { setHapticDebugEvent } from './debug';
import { HapticFeedbackTypes } from "./types";
import type { HapticOptions } from "./types";

const defaultOptions = {
  enableVibrateFallback: false,
  ignoreAndroidSystemSettings: false,
};

const RNHapticFeedback = {
  trigger(
    type:
      | keyof typeof HapticFeedbackTypes
      | HapticFeedbackTypes = HapticFeedbackTypes.selection,
    options: HapticOptions = {},
    debug: boolean | undefined = undefined,
  ) {
    try {
      NativeHapticFeedback.trigger(type, { ...defaultOptions, ...options });
      if (debug) {
        setHapticDebugEvent({ type, options });
      }
    } catch {
      console.warn("RNReactNativeHapticFeedback is not available");
    }
  }
}

export * from "./debug";
export * from "./types";
export const { trigger } = RNHapticFeedback;
export default RNHapticFeedback;
