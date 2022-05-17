import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {EditProfile, GroupChat, Home, Profile, Status} from 'screens';

export type PrivateRoutesType = {
  Home?: undefined;
  Status?: undefined;
  GroupChat?: undefined;
  Profile?: undefined;
  EditProfile?: undefined;
};

const Stack = createNativeStackNavigator<PrivateRoutesType>();

const PrivateRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Home'}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Status" component={Status} />
      <Stack.Screen name="GroupChat" component={GroupChat} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default PrivateRoutes;
