import React from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Svg, {Circle, Path} from 'react-native-svg';
import {DEFAULT_ITEM_HEIGHT} from '../Accordion/types';
import {GoatPlayers} from '../types';
import {styles} from './styles';

interface LayoutProps {
  onPress: () => void;
  animatedBorder: StyleProp<ViewStyle>;
  animatedHeight: Animated.SharedValue<number>;
  section: {title: string; values: GoatPlayers[]};
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const SectionHeader: React.FC<LayoutProps> = ({
  onPress,
  animatedBorder,
  animatedHeight,
  section,
}) => {
  const props = useAnimatedProps(() => ({
    fill: interpolateColor(
      animatedHeight.value,
      [0, DEFAULT_ITEM_HEIGHT * section.values.length],
      ['rgb(229,32,32)', 'rgb(49,128,22)'],
    ),
  }));

  const style = useAnimatedStyle(() => {
    const rotateZ = interpolate(
      animatedHeight.value,
      [0, DEFAULT_ITEM_HEIGHT * section.values.length],
      [0, Math.PI],
    );
    return {
      transform: [{rotateZ}],
    };
  });

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={[styles.container, animatedBorder]}>
        <View style={styles.title}>
          <Text>{section.title}</Text>
        </View>
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
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
