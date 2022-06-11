import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {
  ChatDetails,
  EditProfile,
  GroupChat,
  Home,
  Profile,
  ProfileDetails,
  Status,
} from 'screens';
import {BottomTab} from 'routes';

export type PrivateRoutesType = {
  Home: undefined;
  Status: undefined;
  GroupChat: undefined;
  Profile: undefined;
  EditProfile: undefined;
  BottomTab: undefined;
  ChatDetails: {
    item: any;
    setShowModal?: boolean;
  };
  ProfileDetails: {
    item: any;
  };
};

export type NavigationProps = NativeStackNavigationProp<PrivateRoutesType>;
const Stack = createNativeStackNavigator<PrivateRoutesType>();

const PrivateRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleStyle: {
          fontFamily: 'Nunito-Bold',
        },
      }}
      initialRouteName={'Home'}>
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="Status" component={Status} />
      <Stack.Screen name="GroupChat" component={GroupChat} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen
        name="ChatDetails"
        component={ChatDetails}
        // options={{
        //   headerShown: true,
        //   headerTitle: 'Chat Details',
        // }}
      />
      <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
    </Stack.Navigator>
  );
};

export default PrivateRoutes;
