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
import {DEFAULT_ITEM_HEIGHT, IconType} from '../Accordion/types';
import {GoatPlayers} from '../types';
import {Arrow} from './AnimatedIcons/Arrow';
import {Hamburger} from './AnimatedIcons/Hamburger';
import {styles} from './styles';

interface LayoutProps {
  onPress: () => void;
  animatedBorder: StyleProp<ViewStyle>;
  animatedHeight: Animated.SharedValue<number>;
  section: {title: string; values: GoatPlayers[]};
  renderHeader(
    content: any,
    isActive: boolean,
    sections: any[],
  ): React.ReactElement<{}>;
  isActive: boolean;
  sections: any[];
  height: number;
  iconType?: IconType;
}

export const SectionHeader: React.FC<LayoutProps> = ({
  onPress,
  animatedBorder,
  animatedHeight,
  section,
  renderHeader,
  isActive,
  sections,
  height,
  iconType,
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <Animated.View style={[styles.container, animatedBorder]}>
      {renderHeader ? (
        renderHeader(section, isActive, sections)
      ) : (
        <View style={styles.title}>
          <Text>{section.title}</Text>
        </View>
      )}
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        {iconType === IconType.HAMBURGER ? (
          <Hamburger height={height} progress={animatedHeight} />
        ) : (
          <Arrow height={height} progress={animatedHeight} />
        )}
      </View>
    </Animated.View>
  </TouchableWithoutFeedback>
);
