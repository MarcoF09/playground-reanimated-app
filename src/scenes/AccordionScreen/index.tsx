import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {Accordion} from './Accordion';
import {players} from './goatPlayers';
import {styles} from './styles';

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
