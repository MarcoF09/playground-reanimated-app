import React from 'react';
import {FlatList} from 'react-native';
import {AccordionProps} from './types';
import {Section} from '../Section';

export const Accordion: React.FC<AccordionProps<any>> = ({
  activeSections,
  sections,
  renderHeader,
  renderItem: renderSectionItem,
  renderFooter,
  renderTitle,
  onChange,
}) => (
  <FlatList
    data={sections}
    ListHeaderComponent={renderTitle && renderTitle()}
    ListFooterComponent={renderFooter && renderFooter()}
    renderItem={({item, index}) => (
      <Section
        section={item}
        renderItem={renderSectionItem}
        renderHeader={renderHeader}
        isActive={activeSections[index]}
        sections={sections}
        onChange={onChange}
        sectionIndex={index}
        activeSections={activeSections}
      />
    )}
    keyExtractor={(value, index) => `${index}-${value.title}`}
  />
);
