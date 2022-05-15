import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Register, SplashScreen, VerifyOtp, Welcome} from 'screens';

export type PublicRoutesType = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  SplashScreen: undefined;
  VerifyOtp: {
    name?: string;
    number?: string;
    email?: string;
    password?: string;
    gender?: string;
    countryCode?: string;
  };
};

const Stack = createNativeStackNavigator<PublicRoutesType>();

const PublicRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
    </Stack.Navigator>
  );
};

export default PublicRoutes;
