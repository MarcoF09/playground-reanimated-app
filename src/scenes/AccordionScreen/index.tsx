import React from 'react';
import {View} from 'react-native';
import {Accordion} from './Accordion';
import {styles} from './styles';

export const AccordionScreen: React.FC<{}> = () => {
  return (
    <View style={styles.container}>
      <Accordion />
    </View>
  );
};
