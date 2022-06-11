import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'routes';

type Props = NativeStackScreenProps<PrivateRoutesType, 'ProfileDetails'>;
const ProfileDetails = ({route, navigation}: Props) => {
  const profileData = route.params;
  console.log('object', profileData);
  return (
    <View>
      <Text>ProfileDetails screen</Text>
    </View>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({});
