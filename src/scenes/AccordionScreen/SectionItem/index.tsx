import React, {useMemo} from 'react';
import {Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {GoatPlayers} from '../types';
import {Delay, useAnimatedItem} from './hooks/useAnimatedItem';
import {styles} from './styles';

interface LayoutProps extends GoatPlayers {
  isLast: boolean;
  progress: Animated.SharedValue<number>;
  delay: Delay;
}

export const SectionItem: React.FC<LayoutProps> = ({
  name,
  age,
  isLast,
  delay,
  progress,
}) => {
  const {animatedContainer} = useAnimatedItem(delay, progress);

  const borderStyle = useMemo(
    () => ({
      borderBottomLeftRadius: isLast ? 10 : 0,
      borderBottomRightRadius: isLast ? 10 : 0,
    }),
    [isLast],
  );
  return (
    <Animated.View
      style={[
        styles.container,
        borderStyle,
        !!delay ? animatedContainer : undefined,
      ]}>
      <View style={styles.nameContainer}>
        <Text>{name}</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text>{age}</Text>
      </View>
    </Animated.View>
  );
};
