import {StyleSheet} from 'react-native';
import {DEFAULT_ITEM_HEIGHT} from '../Accordion/types';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    height: DEFAULT_ITEM_HEIGHT,
    paddingHorizontal: 20,
  },
  labelContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  nameContainer: {
    flex: 5,
  },
});
