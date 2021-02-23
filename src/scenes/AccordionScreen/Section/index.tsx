import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SectionHeader} from '../SectionHeader';
import {SectionItem} from '../SectionItem';
import {GoatPlayers, ITEM_HEIGHT} from '../types';
import {useHandleSectionHeight} from './hooks/useHandleSectionHeight';

interface indexProps {
  section: {title: string; values: GoatPlayers[]};
  renderItem: any;
  renderHeader: any;
  isActive: number;
  sections: {title: string; values: GoatPlayers[]}[];
  onChange: (indexes: number[]) => void;
  sectionIndex: number;
  activeSections: number[];
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export const Section: React.FC<indexProps> = ({
  section,
  renderItem,
  renderHeader,
  sections,
  isActive,
  sectionIndex,
  activeSections,
  onChange,
}) => {
  const itemRef = useRef<Animated.View>();

  const {heightAnimated} = useHandleSectionHeight(itemRef, section, isActive);

  const toggleSection = useCallback((isActive: boolean) => {
    let updatedSections = activeSections.slice();

    console.log({sectionIndex});

    updatedSections = activeSections.map((value, index) =>
      index === sectionIndex ? (isActive ? 0 : 1) : value,
    );

    onChange(updatedSections);
  }, []);

  const onPress = useCallback(() => {
    toggleSection(!!isActive);
  }, [isActive]);

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
      {!!renderHeader ? (
        renderHeader
      ) : (
        <SectionHeader
          onPress={onPress}
          animatedBorder={animatedBorder}
          animatedHeight={heightAnimated}
          section={section}
        />
      )}
      <Animated.View style={animatedStyle} ref={itemRef}>
        {section.values.map((item, index) => {
          const isLast = index === section.values.length - 1;
          return !!renderItem ? (
            renderItem(item, isLast, index, undefined, sections)
          ) : (
            <SectionItem {...item} isLast={isLast} />
          );
        })}
      </Animated.View>
    </View>
  );
};
