import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {Accordion} from './Accordion';
import {SectionItem} from './SectionItem';
import {players} from './goatPlayers';
import {styles} from './styles';
import {GoatPlayers} from './types';
import {SectionHeader} from './SectionHeader';

export const AccordionScreen: React.FC<{}> = () => {
  const [activeSections, setActiveSections] = useState<number[]>([1, 0, 0]);
  return (
    <View style={styles.container}>
      <Accordion
        sections={players}
        activeSections={activeSections}
        onChange={(indexes) => {
          console.log({indexes, activeSections});

          setActiveSections(indexes);
        }}
        // renderItem={(
        //   content: GoatPlayers,
        //   isLast: boolean,
        //   index: number,
        //   isActive: boolean,
        //   sections: {title: string; values: GoatPlayers[]}[],
        // ) => <SectionItem {...content} isLast={isLast} />}
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
