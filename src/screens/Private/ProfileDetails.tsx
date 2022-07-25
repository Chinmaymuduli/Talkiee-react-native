import {StyleSheet} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'routes';
import {Box, Heading, HStack, Image, Text, VStack} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from 'configs';

type Props = NativeStackScreenProps<PrivateRoutesType, 'ProfileDetails'>;
const ProfileDetails = ({route, navigation}: Props) => {
  const profileData = route.params.item;
  // console.log('object', profileData);
  return (
    <Box>
      <Box p={4}>
        <Ionicons
          name="arrow-back"
          size={30}
          color="black"
          onPress={() => navigation.goBack()}
        />
      </Box>
      <VStack justifyContent={'center'} alignItems={'center'}>
        <Image
          source={{uri: profileData.avatar}}
          h={100}
          w={100}
          alt="image"
          borderRadius={50}
          resizeMode="cover"
        />
        <Heading mt={2}>{profileData.name}</Heading>
        <Text mt={1}>1234567890</Text>
      </VStack>
      <HStack alignItems={'center'} justifyContent={'center'} space={5}>
        <Box>
          <MaterialCommunityIcons name="android-messages" size={25} />
        </Box>
        <Box>
          <MaterialCommunityIcons name="android-messages" size={25} />
        </Box>
      </HStack>
    </Box>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({});
