import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeBaseProvider} from 'native-base';
import Router from './src/Router';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Router />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
