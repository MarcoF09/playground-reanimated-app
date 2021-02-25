import React, {useCallback, useState} from 'react';
import {View, FlatList} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {IconType} from '../Accordion/types';
import {SectionHeader} from '../SectionHeader';
import {SectionItem} from '../SectionItem';
import {useHandleSectionHeight} from './hooks/useHandleSectionHeight';

interface IndexProps<T> {
  section: T;
  renderContent: any;
  renderHeader: any;
  isActive: number;
  sections: T[];
  onChange: (indexes: number[]) => void;
  sectionIndex: number;
  activeSections: number[];
  iconType?: IconType;
}

export const Section: React.FC<IndexProps<any>> = ({
  section,
  renderContent,
  renderHeader,
  sections,
  isActive,
  sectionIndex,
  activeSections,
  onChange,
  iconType,
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
      <SectionHeader
        onPress={toggleSection}
        animatedBorder={animatedBorder}
        animatedHeight={heightAnimated}
        height={height}
        section={section}
        renderHeader={renderHeader}
        isActive={isActive === 1}
        sections={sections}
        iconType={iconType}
      />
      <Animated.View
        style={animatedViewStyle}
        onLayout={(event) => {
          if (event.nativeEvent.layout.height && !onLayoutEnd) {
            setHeight(event.nativeEvent.layout.height);
            setOnLayoutEnd(true);
          }
        }}>
        {!!renderContent ? (
          renderContent(section)
        ) : (
          <FlatList
            data={section.values}
            renderItem={({item, index}) => (
              <SectionItem
                {...item}
                isLast={index === section.values.length - 1}
              />
            )}
            keyExtractor={(_item, index) => `${index}`}
          />
        )}
      </Animated.View>
    </View>
  );
};
