import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
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
  const contentRef = useRef<View>(null);
  const [minHeight, setMinHeight] = useState<number>(0);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  const {heightAnimated} = useHandleSectionHeight(
    contentRef,
    section,
    isActive,
    maxHeight,
    minHeight,
  );

  const toggleSection = useCallback(() => {
    const updatedSections = activeSections.map((value, index) =>
      index === sectionIndex ? (!!isActive ? 0 : 1) : value,
    );

    onChange(updatedSections);
  }, [activeSections, isActive]);

  const animatedViewStyle = useAnimatedStyle(() => ({
    height: heightAnimated.value,
    overflow: 'hidden',
  }));

  const animatedBorder = useAnimatedStyle(() => ({
    borderBottomLeftRadius: heightAnimated.value === 0 ? 10 : 0,
    borderBottomRightRadius: heightAnimated.value === 0 ? 10 : 0,
  }));

  return (
    <View>
      <View
        onLayout={(event) => {
          console.log({eventHeight: event.nativeEvent.layout.height});
          setMinHeight(event.nativeEvent.layout.height);
        }}>
        {!!renderHeader ? (
          renderHeader
        ) : (
          <SectionHeader
            onPress={toggleSection}
            animatedBorder={animatedBorder}
            animatedHeight={heightAnimated}
            section={section}
          />
        )}
      </View>
      <Animated.View
        style={animatedViewStyle}
        onLayout={(event) => setMaxHeight(event.nativeEvent.layout.height)}
        ref={contentRef}>
        {/* <Animated.View style={animatedContentStyle}> */}
        <FlatList
          data={section.values}
          renderItem={
            !!renderItem
              ? ({item, index}) =>
                  renderItem(
                    item,
                    index === section.values.length - 1,
                    index,
                    undefined,
                    sections,
                  )
              : ({item, index}) => (
                  <SectionItem
                    {...item}
                    isLast={index === section.values.length - 1}
                  />
                )
          }
          keyExtractor={(_item, index) => `${index}`}
        />
        {/* </Animated.View> */}
      </Animated.View>
    </View>
  );
};
