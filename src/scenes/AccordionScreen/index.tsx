import React, {useCallback, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {Accordion} from './Accordion';
import {AnimationType, IconType} from './Accordion/types';
import {players} from './goatPlayers';
import {SectionItem} from './SectionItem';
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
        animationType={AnimationType.STAGGERED}
        // renderItem={(
        //   content: any,
        //   index: number,
        //   isActive: boolean,
        //   sections: any[],
        // ) => <Text>{'hola body'}</Text>}
        // renderContent={(section: any) => (
        //   <FlatList
        //     data={section.values}
        //     renderItem={({item, index}) => (
        //       <SectionItem
        //         {...item}
        //         isLast={index === section.values.length - 1}
        //       />
        //     )}
        //     keyExtractor={(_item, index) => `${index}`}
        //   />
        // )}
        //   renderHeader={(
        //     content: any,
        //     index: number,
        //     isActive: boolean,
        //     sections: any[],
        //   ) => <Text>hola title</Text>}
        //   iconType={IconType.HAMBURGER}
      />
    </View>
  );
};
