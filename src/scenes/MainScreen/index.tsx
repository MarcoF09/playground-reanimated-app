import React from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SCREENS} from '../../../App';
import {ItemSeparator} from '../../components/ItemSeparator';
import {styles} from './styles';

export const MainScreen = ({navigation}: any) => {
  const data = Object.keys(SCREENS).map((key) => ({key}));
  return (
    <FlatList
      style={styles.list}
      data={data}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={(props) => (
        <MainScreenItem
          {...props}
          screens={SCREENS}
          onPressItem={({key}: any) => navigation.navigate(key)}
        />
      )}
      renderScrollComponent={(props) => <ScrollView {...props} />}
    />
  );
};

const MainScreenItem = ({item, onPressItem, screens}: any) => {
  const {key} = item;
  return (
    <RectButton style={styles.button} onPress={() => onPressItem(item)}>
      <Text style={styles.buttonText}>{screens[key].title || key}</Text>
    </RectButton>
  );
};
