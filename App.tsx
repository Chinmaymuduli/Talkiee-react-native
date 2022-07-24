import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeBaseProvider} from 'native-base';
import Router from './src/Router';
import {NavigationContainer} from '@react-navigation/native';
import AppContextProvider from './src/context/AppContextProvider';

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <AppContextProvider>
          <Router />
        </AppContextProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
