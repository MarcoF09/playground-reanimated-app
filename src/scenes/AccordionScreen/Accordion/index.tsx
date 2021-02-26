import React from 'react';
import {FlatList} from 'react-native';
import {AccordionProps, AnimationType, IconType} from './types';
import {Section} from '../Section';

export const Accordion: React.FC<AccordionProps<any>> = ({
  activeSections,
  sections,
  renderHeader,
  renderContent,
  renderFooter,
  renderTitle,
  onChange,
  iconType = IconType.ARROW,
  animationType = AnimationType.NORMAL,
}) => (
  <FlatList
    data={sections}
    ListHeaderComponent={renderTitle && renderTitle()}
    ListFooterComponent={renderFooter && renderFooter()}
    renderItem={({item, index}) => (
      <Section
        section={item}
        renderContent={renderContent}
        renderHeader={renderHeader}
        isActive={activeSections[index]}
        sections={sections}
        onChange={onChange}
        sectionIndex={index}
        activeSections={activeSections}
        iconType={iconType}
        animationType={animationType}
      />
    )}
    keyExtractor={(value, index) => `${index}-${value.title}`}
  />
);
