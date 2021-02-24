import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    height: 60,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    flex: 5,
    justifyContent: 'center',
  },
});
