import React from 'react';
import {FlatList, View} from 'react-native';
import {Accordion} from './Accordion';
import {SectionItem} from './SectionItem';
import {players} from './goatPlayers';
import {styles} from './styles';
import {GoatPlayers} from './types';
import {SectionHeader} from './SectionHeader';

export const AccordionScreen: React.FC<{}> = () => {
  return (
    <View style={styles.container}>
      <Accordion
        sections={players}
        activeSections={[0, 0, 0]}
        renderItem={(
          content: GoatPlayers,
          isLast: boolean,
          index: number,
          isActive: boolean,
          sections: {title: string; values: GoatPlayers[]}[],
        ) => <SectionItem {...content} isLast={isLast} />}
        // renderHeader={(
        //   content: {title: string; values: GoatPlayers[]},
        //   index: number,
        //   isActive: boolean,
        //   sections: {title: string; values: GoatPlayers[]}[],
        // ) => <SectionHeader />}
      />
    </View>
  );
};
