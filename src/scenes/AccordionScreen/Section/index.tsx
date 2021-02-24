import React, {useCallback, useState} from 'react';
import {View, FlatList} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {SectionHeader} from '../SectionHeader';
import {SectionItem} from '../SectionItem';
import {useHandleSectionHeight} from './hooks/useHandleSectionHeight';

interface IndexProps<T> {
  section: T;
  renderItem: any;
  renderHeader: any;
  isActive: number;
  sections: T[];
  onChange: (indexes: number[]) => void;
  sectionIndex: number;
  activeSections: number[];
}

export const Section: React.FC<IndexProps<any>> = ({
  section,
  renderItem,
  renderHeader,
  sections,
  isActive,
  sectionIndex,
  activeSections,
  onChange,
}) => {
  const [onLayoutEnd, setOnLayoutEnd] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);

  const toggleSection = useCallback(() => {
    const updatedSections = activeSections.map((value, index) =>
      index === sectionIndex ? (!!isActive ? 0 : 1) : value,
    );

    onChange(updatedSections);
  }, [activeSections, isActive]);

  const {heightAnimated} = useHandleSectionHeight(section, isActive, height);

  const animatedViewStyle = useAnimatedStyle(() => ({
    height: !onLayoutEnd ? undefined : heightAnimated.value,
    overflow: 'hidden',
  }));

  const animatedBorder = useAnimatedStyle(() => ({
    borderBottomLeftRadius: heightAnimated.value === 0 ? 10 : 0,
    borderBottomRightRadius: heightAnimated.value === 0 ? 10 : 0,
  }));

  return (
    <View>
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
      <Animated.View
        style={animatedViewStyle}
        onLayout={(event) => {
          if (event.nativeEvent.layout.height && !onLayoutEnd) {
            setHeight(event.nativeEvent.layout.height);
            setOnLayoutEnd(true);
          }
        }}>
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
      </Animated.View>
    </View>
  );
};
