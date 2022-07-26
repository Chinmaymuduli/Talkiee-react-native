import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {COVERIMG, Person} from 'assets';
import {COLORS} from 'configs';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ImagePicker} from 'components/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppContext} from 'context';

const profileMenu = [
  {
    label: 'Change Password',
    icon: <MaterialIcons name="logout" size={20} color={COLORS.textWhite} />,
    color: COLORS.primary,
  },
  {
    label: 'Theme',
    icon: (
      <MaterialIcons name="brightness-6" size={20} color={COLORS.textWhite} />
    ),
    color: COLORS.secondary,
  },
  {
    label: 'Contact Us',
    icon: (
      <MaterialIcons name="contactless" size={20} color={COLORS.textWhite} />
    ),
    color: '#d97706',
  },
  {
    label: 'Invite Friends',
    icon: <MaterialIcons name="share" size={20} color={COLORS.textWhite} />,
    color: '#84cc16',
  },
  {
    label: 'Term & Condition',
    icon: (
      <Ionicons
        name="md-document-text-outline"
        size={20}
        color={COLORS.textWhite}
      />
    ),
    color: '#22c55e',
  },
];

const Profile = () => {
  const [profileimage, setprofileimage] = useState('');
  const [visiable, setVisiable] = useState(false);
  const {setUser} = useAppContext();
  const handleDismiss = () => {
    setVisiable(false);
  };
  const logout = async () => {
    const token = await AsyncStorage.removeItem('tokenId');
    setUser({});
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Box h={150} bg={'red.100'}>
        <ImageBackground
          resizeMode="cover"
          style={{width: '100%', height: '100%'}}
          source={COVERIMG}>
          <Pressable
            onPress={() => setVisiable(true)}
            alignSelf={'flex-end'}
            justifyItems={'center'}
            mt={5}
            mr={5}>
            <Box bg={COLORS.textWhite} borderRadius={30}>
              <Entypo
                name="edit"
                size={20}
                color={COLORS.cyan}
                style={{padding: 5}}
              />
            </Box>
          </Pressable>
        </ImageBackground>
      </Box>
      <Box bg={COLORS.textWhite} flex={1} mt={-5} borderTopRadius={30}>
        <Box px={4}>
          <Pressable mt={-10} onPress={() => {}}>
            <Box justifyContent={'center'} alignItems={'center'}>
              <Box
                borderWidth={5}
                borderRadius={50}
                borderColor={COLORS.textWhite}>
                <Image
                  source={Person}
                  height={75}
                  w={75}
                  alt={'profileimg'}
                  borderRadius={50}
                  resizeMode={'cover'}
                />
              </Box>
              <VStack justifyContent={'center'} alignItems={'center'}>
                <Text bold fontSize={17}>
                  Chinmay Muduli
                </Text>
                <Text numberOfLines={1} mt={1} fontFamily={'Nunito-Regular'}>
                  Hello! i am using talkiee app,it's so awesome
                </Text>
              </VStack>
            </Box>
          </Pressable>
        </Box>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box mt={8}>
            {profileMenu.map((item, index) => (
              <Box key={index} px={4} mb={7}>
                <Pressable>
                  <HStack
                    alignItems={'center'}
                    justifyContent={'space-between'}>
                    <HStack alignItems={'center'} space={4}>
                      <Box bg={item.color} borderRadius={5}>
                        <Box p={1}>{item.icon}</Box>
                      </Box>
                      <Text bold fontSize={15}>
                        {item.label}
                      </Text>
                    </HStack>
                    <Box alignItems={'center'}>
                      <Ionicons
                        name="chevron-forward"
                        size={20}
                        color={COLORS.primary}
                      />
                    </Box>
                  </HStack>
                </Pressable>
              </Box>
            ))}
          </Box>
          <Box px={4} mb={110}>
            <Pressable onPress={logout}>
              <HStack alignItems={'center'} justifyContent={'space-between'}>
                <HStack alignItems={'center'} space={4}>
                  <Box bg={'#ef4444'} borderRadius={5}>
                    <Box p={1}>
                      <MaterialIcons
                        name="power-settings-new"
                        size={20}
                        color={COLORS.textWhite}
                      />
                    </Box>
                  </Box>
                  <Text bold fontSize={15}>
                    Logout
                  </Text>
                </HStack>
                <Box alignItems={'center'}>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={COLORS.primary}
                  />
                </Box>
              </HStack>
            </Pressable>
          </Box>
        </ScrollView>
      </Box>
      <ImagePicker
        visible={visiable}
        onDismiss={handleDismiss}
        setImageURI={setprofileimage}
        cropperCircleOverlay={true}
        postImages={false}
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
