import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export interface Delay {
  [key: number]: number;
}

export const useAnimatedItem = (
  delay: Delay,
  progress: Animated.SharedValue<number>,
) => {
  const delayedAnimation = useSharedValue<number>(0);

  if (!!delay) {
    useAnimatedReaction(
      () => progress.value,
      (value) =>
        (delayedAnimation.value = withDelay(
          delay[interpolate(value, [0, 300], [0, 1])],
          withTiming(interpolate(value, [0, 300], [0, 1])),
        )),
    );
  }

  const animatedContainer = useAnimatedStyle(() => ({
    opacity: interpolate(
      delayedAnimation.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP,
    ),
  }));

  return {
    animatedContainer,
  };
};
