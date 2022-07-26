import {SafeAreaView, StyleSheet} from 'react-native';
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
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'routes';
import {useDbFetch} from 'hooks';
import {BASE_URL, GET_FRIENDS} from '../../configs/pathConfig';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Message_Type = {
  _id: string;
  conversationId: string;
  createdAt: string;
  delivered?: boolean;
  message?: string;
  receiver?: string;
  sender?: string;
};

type MESSAGE_USER = {
  _id?: string;
  gender?: string;
  name?: string;
  profileImage?: string;
};

type FRIENDS_TYPE = {
  _id: string;
  message: Message_Type;
  unseenMessages: number;
  user: MESSAGE_USER;
};

const Home = () => {
  const navigation = useNavigation<NavigationProps>();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<any>();
  const [friendsArray, setFriendsArray] = useState<FRIENDS_TYPE[]>([]);

  const {fetchData, loading} = useDbFetch();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchData(
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
          path: BASE_URL + GET_FRIENDS,
        },
        (result, response) => {
          // console.log(result);
          if (response?.status === 200) {
            setFriendsArray(result?.data);
          }
        },
      );
    }
    return () => {
      mounted = false;
    };
  }, []);

  // console.log(friendsArray);

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
          {friendsArray?.map((item: FRIENDS_TYPE) => (
            <Pressable
              px={4}
              py={2}
              key={item?._id}
              onPress={() =>
                navigation.navigate('ChatDetails', {
                  item: {
                    _id: item?._id,
                    name: item?.user?.name,
                    userId: item?.user?._id,
                    profileImage: item?.user?.profileImage,
                    conversationId: item?._id,
                  },
                })
              }>
              <Row space={3} alignItems={'center'}>
                <Pressable
                  onPress={() => {
                    setShowModal(true), setModalData(item);
                  }}>
                  <Avatar
                    source={{
                      uri: item?.user?.profileImage,
                    }}
                    h={12}
                    w={12}
                    borderRadius={30}
                    // resizeMode={'contain'}
                  >
                    {item?.user?.name?.charAt(0)}
                  </Avatar>
                </Pressable>
                <VStack flex={1}>
                  <Text fontFamily={'Nunito-Bold'} fontSize={16}>
                    {item?.user?.name}
                  </Text>
                  <Text fontFamily={'Nunito-Regular'}>
                    {item?.message?.message}
                  </Text>
                </VStack>
                <Text>
                  {moment(item?.message?.createdAt).format('HH:mm A')}
                </Text>
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
        item={modalData}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
