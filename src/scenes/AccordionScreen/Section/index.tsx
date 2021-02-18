import React, {useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SectionHeader} from '../SectionHeader';
import {SectionItem} from '../SectionItem';
import {GoatPlayers, ITEM_HEIGHT} from '../types';

interface indexProps {
  section: {title: string; values: GoatPlayers[]};
  renderItem: any;
  renderHeader: any;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export const Section: React.FC<indexProps> = ({section, renderItem}) => {
  const heightAnimated = useSharedValue(0);

  const onPress = useCallback(() => {
    heightAnimated.value = withTiming(
      heightAnimated.value === 0 ? ITEM_HEIGHT * section.values.length : 0,
      {
        duration: 400,
      },
    );
  }, [heightAnimated]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: heightAnimated.value,
    overflow: 'hidden',
  }));

  const animatedBorder = useAnimatedStyle(() => ({
    borderBottomLeftRadius: heightAnimated.value === 0 ? 10 : 0,
    borderBottomRightRadius: heightAnimated.value === 0 ? 10 : 0,
  }));

  return (
    <View style={{paddingVertical: 5}}>
      <SectionHeader
        onPress={onPress}
        animatedBorder={animatedBorder}
        animatedHeight={heightAnimated}
        section={section}
      />
      <Animated.View style={animatedStyle}>
        {section.values.map((item, index) => {
          const isLast = index === section.values.length - 1;
          return !!renderItem ? (
            renderItem(item, isLast)
          ) : (
            <SectionItem {...item} isLast={isLast} />
          );
        })}
      </Animated.View>
    </View>
  );
};
