import React, {useState, useEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import {mix} from '../../common/helpers';
import {
  Button,
  Card,
  cards,
  StyleGuide,
} from '../../components/canItBeDoneComponents';
import {styles} from './styles';
const {width} = Dimensions.get('window');
const origin = {x: -(width / 2 - StyleGuide.spacing * 2), y: 0};

export const useSpringTransition = (state: boolean | number) => {
  const value = useSharedValue(0);
  useEffect(() => {
    value.value = typeof state === 'boolean' ? (state ? 1 : 0) : state;
  }, [state, value]);
  const transition = useDerivedValue(() => {
    return withSpring(value.value);
  });
  return transition;
};

export const TransitionScreen = () => {
  const [toggled, setToggle] = useState(false);
  const transition = useSpringTransition(toggled);
  return (
    <View style={styles.container}>
      {cards.slice(0, 3).map((card, index) => {
        const style = useAnimatedStyle(() => {
          const rotate = (index - 1) * mix(transition.value, 0, Math.PI / 6);
          return {
            transform: [
              {translateX: origin.x},
              {rotate: `${rotate}rad`},
              {translateX: -origin.x},
            ],
          };
        });
        return (
          <Animated.View key={card} style={[styles.overlay, style]}>
            <Card {...{card}} />
          </Animated.View>
        );
      })}
      <Button
        label={toggled ? 'Reset' : 'Start'}
        onPress={() => setToggle((prev) => !prev)}
        primary
      />
    </View>
  );
};
