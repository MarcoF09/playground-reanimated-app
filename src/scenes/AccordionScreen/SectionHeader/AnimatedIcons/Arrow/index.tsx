import React from 'react';
import {View} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Svg, {Circle, Path} from 'react-native-svg';

import {AnimatedIconProps} from '../types';
import {styles} from './styles';

interface ArrowProps extends AnimatedIconProps {
  height: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const Arrow: React.FC<ArrowProps> = ({progress, height}) => {
  const props = useAnimatedProps(() => ({
    fill: interpolateColor(
      progress.value,
      [0, height],
      ['rgb(229,32,32)', 'rgb(49,128,22)'],
    ),
  }));

  const style = useAnimatedStyle(() => {
    const rotateZ = interpolate(progress.value, [0, height], [0, Math.PI]);
    return {
      transform: [{rotateZ}],
    };
  });

  return (
    <Animated.View style={[styles.iconContainer, style]}>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <AnimatedCircle cx="12" cy="12" r="12" animatedProps={props} />
        <Path
          d="M6 9C10.8 14.2 12.3333 15.8333 12.5 16L18.5 9"
          stroke="white"
          strokeWidth={2}
        />
      </Svg>
    </Animated.View>
  );
};
