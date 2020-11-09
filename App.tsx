/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

function Box() {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value * 255}],
    };
  });

  return (
    <>
      <Animated.View style={[styles.box, animatedStyles]} />
      <Button
        onPress={() => {
          offset.value = withSpring(Math.random());
        }}
        title="Move"
      />
    </>
  );
}

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Box />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 50,
    height: 50,
    borderColor: '#F5FCFF',
    borderRadius: 10,
    backgroundColor: 'blue',
    margin: 50 / 2,
  },
  container: {flex: 1, justifyContent: 'center'},
});

export default App;
