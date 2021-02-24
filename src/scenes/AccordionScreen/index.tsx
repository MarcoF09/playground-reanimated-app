import React, {useCallback, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Accordion} from './Accordion';
import {SectionItem} from './SectionItem';
import {players} from './goatPlayers';
import {styles} from './styles';
import {GoatPlayers} from './types';
import {SectionHeader} from './SectionHeader';

export const AccordionScreen: React.FC<{}> = () => {
  const [activeSections, setActiveSections] = useState<number[]>([1, 0, 0]);
  const onChange = useCallback((indexes: number[]) => {
    setActiveSections(indexes);
  }, []);

  return (
    <View style={styles.container}>
      <Accordion
        sections={players}
        activeSections={activeSections}
        onChange={onChange}
        // renderItem={(
        //   content: GoatPlayers,
        //   index: number,
        //   isActive: boolean,
        //   sections: {title: string; values: GoatPlayers[]}[],
        // ) => (
        //   <FlatList
        //     data={players[index].values}
        //     renderItem={({item, index}) => (
        //       <SectionItem
        //         {...item}
        //         isLast={index === players[index].values.length - 1}
        //       />
        //     )}
        //     keyExtractor={(_item, index) => `${index}`}
        //     onLayout={({nativeEvent}) => {
        //       console.log(nativeEvent.layout);
        //     }}
        //   />
        // )}
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
