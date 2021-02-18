import React from 'react';
import {FlatList} from 'react-native';
import {GoatPlayers} from '../types';
import {AccordionProps} from './types';
import {Section} from '../Section';

export const Accordion: React.FC<AccordionProps<{
  title: string;
  values: GoatPlayers[];
}>> = ({
  activeSections,
  sections,
  renderHeader,
  renderItem: renderSectionItem,
  renderFooter,
  renderTitle,
}) => (
  <FlatList
    data={sections}
    renderItem={({item}) => (
      <Section
        section={item}
        renderItem={renderSectionItem}
        renderHeader={renderHeader}
      />
    )}
    keyExtractor={() => ''}
  />
);
