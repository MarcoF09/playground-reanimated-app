import React from 'react';
import {View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {styles} from './styles';
import {AnimatedIconProps} from '../types';
import {transformOrigin} from '../../../../../common/transformations';

interface HamburgerProps extends AnimatedIconProps {
  height: number;
}

export const Hamburger: React.FC<HamburgerProps> = ({progress, height}) => {
  const firstPathStyle = useAnimatedStyle(() => {
    const transformation = transformOrigin({x: -10, y: 0}, [
      {
        rotateZ: `${interpolate(
          progress.value,
          [0, height],
          [0, 45],
          Extrapolate.CLAMP,
        )}deg`,
      },
    ]) as any;
    return {
      left: interpolate(progress.value, [0, 1], [9, 12], Extrapolate.CLAMP),
      top: interpolate(progress.value, [0, 1], [10, 11], Extrapolate.CLAMP),
      transform: [...transformation],
      width: `${interpolate(
        progress.value,
        [0, height],
        [70, 75],
        Extrapolate.CLAMP,
      )}%`,
    };
  });

  const thirdPathStyle = useAnimatedStyle(() => {
    const transformation = transformOrigin({x: -10, y: 0}, [
      {
        rotateZ: `-${interpolate(
          progress.value,
          [0, height],
          [0, 45],
          Extrapolate.CLAMP,
        )}deg`,
      },
    ]) as any;
    return {
      left: interpolate(progress.value, [0, 1], [9, 12], Extrapolate.CLAMP),
      top: interpolate(progress.value, [0, 1], [26, 25], Extrapolate.CLAMP),
      transform: [...transformation],
      width: `${interpolate(
        progress.value,
        [0, height],
        [70, 75],
        Extrapolate.CLAMP,
      )}%`,
    };
  });

  const secondPathStyle = useAnimatedStyle(() => ({
    left: 14,
    opacity: interpolate(
      progress.value,
      [0, height],
      [1, 0],
      Extrapolate.CLAMP,
    ),
    top: 18,
    width: '70%',
  }));

  const style = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, height],
      ['rgb(229,32,32)', 'rgb(49,128,22)'],
    ),
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.overlay, style]} />
      <Animated.View style={[styles.baseline, firstPathStyle]} />
      <Animated.View style={[styles.baseline, secondPathStyle]} />
      <Animated.View style={[styles.baseline, thirdPathStyle]} />
    </View>
  );
};
