import {Dimensions, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Avatar,
  Box,
  Fab,
  Heading,
  HStack,
  Icon,
  Image,
  Pressable,
  Row,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from 'configs';
import {ProfileModal} from 'components/core';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'routes';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';

const chatArr = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://source.unsplash.com/user/c_v_r',
    Message: 'Hello user message',
    time: '12:00 am',
  },
  {
    id: 2,
    name: 'Sara Doe',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500',
    Message: 'Hello user message',
    time: '12:00 am',
  },
  {
    id: 3,
    name: 'willey John',
    avatar:
      'https://images.unsplash.com/photo-1491349174775-aaafddd81942?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500',
    Message: 'Hello user message',
    time: '12:00 am',
  },
  {
    id: 4,
    name: 'Vikram Doe',
    avatar: '',
    Message: 'Hello user message',
    time: '12:00 am',
  },
];

const Home = () => {
  const navigation = useNavigation<NavigationProps>();
  const [showModal, setShowModal] = useState(false);
  const [item, setItem] = useState<any[]>();
  const [allUser, setAllUser] = useState<any[]>();
  const [showSearch, setShowSearch] = useState(false);
  // console.log('object255', allUser);
  // fetch data from api

  // useEffect(() => {
  //   const RESPONSDATA = async () => {
  //     const token = await AsyncStorage.getItem('tokenId');
  //     const Response = await fetch('https://talkieeapp.herokuapp.com/friends', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const data = await Response.json();
  //     // console.log(data?.data);
  //     setAllUser(data?.data);
  //   };
  //   RESPONSDATA();
  // }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Box bg={COLORS.cyan} h={110}>
        <Row
          alignItems={'center'}
          justifyContent={'space-between'}
          px={5}
          py={5}>
          <Box>
            <Heading
              size={'md'}
              fontSize={20}
              letterSpacing={1}
              color={COLORS.textWhite}>
              Chats
            </Heading>
          </Box>
          <HStack space={6} alignItems={'center'}>
            <Ionicons
              name="search-outline"
              size={25}
              color={COLORS.textWhite}
            />
            <Pressable
              justifyContent={'center'}
              borderRadius={6}
              onPress={() => navigation.navigate('ContactsList', {})}>
              <AntDesign name="plus" color={'white'} size={28} />
            </Pressable>
          </HStack>
        </Row>
      </Box>
      <ScrollView
        mt={-10}
        bg={COLORS.textWhite}
        borderTopRadius={30}
        showsVerticalScrollIndicator={false}>
        <Box mt={3}>
          {chatArr?.map((item: any) => (
            <Pressable
              px={4}
              py={2}
              key={item?.id}
              onPress={() => navigation.navigate('ChatDetails', {item})}>
              <Row space={3} alignItems={'center'}>
                <Pressable
                  onPress={() => {
                    setShowModal(true), setItem(item);
                  }}>
                  <Avatar
                    source={{
                      uri: item?.avatar,
                    }}
                    h={12}
                    w={12}
                    borderRadius={30}>
                    {item?.name?.charAt(0)}
                  </Avatar>
                </Pressable>
                <VStack flex={1}>
                  <Text fontFamily={'Nunito-Bold'} fontSize={16}>
                    {item?.name}
                  </Text>
                  <Text fontFamily={'Nunito-Regular'}>this is message</Text>
                </VStack>
                <Text>12:15AM</Text>
              </Row>
            </Pressable>
          ))}
        </Box>
        {/* fab */}
      </ScrollView>

      {/* Modal Component */}
      <ProfileModal
        showModal={showModal}
        setShowModal={setShowModal}
        item={item}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
