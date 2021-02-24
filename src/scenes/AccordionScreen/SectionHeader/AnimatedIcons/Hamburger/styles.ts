import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  baseline: {
    backgroundColor: 'white',
    height: 2,
    position: 'absolute',
  },
  container: {
    alignSelf: 'center',
    borderRadius: 20,
    height: 40,
    padding: 5,
    width: 40,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(196,196,196,0.5)',
    borderRadius: 40,
  },
});
