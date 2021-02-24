import React, {useCallback, useState} from 'react';
import {Text, View} from 'react-native';
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
        renderItem={(
          content: any,
          index: number,
          isActive: boolean,
          sections: any[],
        ) => <Text>{'hola body'}</Text>}
        // renderHeader={(
        //   content: any,
        //   index: number,
        //   isActive: boolean,
        //   sections: any[],
        // ) => <Text>hola title</Text>}
      />
    </View>
  );
};
