import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Avatar,
  Box,
  Fab,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Modal,
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
import {useAppContext} from 'context';
import Feather from 'react-native-vector-icons/Feather';

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
  typingStatus?: boolean;
};

const Home = () => {
  const navigation = useNavigation<NavigationProps>();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<any>();
  const [friendsArray, setFriendsArray] = useState<FRIENDS_TYPE[]>([]);
  const [showSearchBox, setSearchBox] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectChat, setSelectChat] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

  const {fetchData, loading} = useDbFetch();

  const {user, socketRef} = useAppContext();

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

  useEffect(() => {
    if (socketRef?.current) {
      socketRef.current.on('message-receive', (data: any) => {
        // console.log('socket received', data);
        setFriendsArray((prev: FRIENDS_TYPE[]) => {
          let filterData = prev?.map(item => {
            if (item?.message?.conversationId === data?.conversationId) {
              return {
                ...item,
                message: {
                  ...item?.message,
                  message: data?.message,
                },
              };
            } else {
              return item;
            }
          });

          return filterData;
        });
      });
      socketRef.current.on('typing-user', (data: any) => {
        // console.log('typing received', data);
        setFriendsArray((prev: FRIENDS_TYPE[]) => {
          let filterData = prev?.map(item => {
            if (item?.user?._id === data?.sender) {
              return {
                ...item,
                typingStatus: true,
              };
            } else {
              return item;
            }
          });

          return filterData;
        });
      });
      socketRef.current.on('typing-off-user', (data: any) => {
        // console.log('typing received', data);
        setFriendsArray((prev: FRIENDS_TYPE[]) => {
          let filterData = prev?.map(item => {
            if (item?.user?._id === data?.sender) {
              return {
                ...item,
                typingStatus: false,
              };
            } else {
              return item;
            }
          });

          return filterData;
        });
      });
    }
  }, [socketRef]);

  // console.log(friendsArray);

  const handelLongPress = (item: any) => {
    setSelectedItem(item._id);
    setSelectChat(true);
  };
  // console.log('first', selectedItem);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.cyan}}>
      {!selectChat ? (
        !showSearchBox ? (
          <Box bg={COLORS.cyan}>
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
                <Pressable onPress={() => setSearchBox(true)}>
                  <Ionicons
                    name="search-outline"
                    size={25}
                    color={COLORS.textWhite}
                  />
                </Pressable>
                <Pressable
                  justifyContent={'center'}
                  borderRadius={6}
                  onPress={() => navigation.navigate('ContactsList', {})}>
                  <AntDesign name="plus" color={'white'} size={28} />
                </Pressable>
              </HStack>
            </Row>
          </Box>
        ) : (
          <Box bg={COLORS.cyan}>
            <Row
              alignItems={'center'}
              justifyContent={'space-between'}
              px={5}
              py={2}>
              <Input
                placeholder="search...."
                variant={'unstyled'}
                // fontWeight="bold"
                fontSize={15}
                placeholderTextColor={COLORS.lightGrey}
                color="white"
                selectionColor={COLORS.textWhite}
                InputLeftElement={
                  <Pressable onPress={() => setSearchBox(false)}>
                    <Ionicons
                      name="arrow-back-outline"
                      size={27}
                      color={COLORS.textWhite}
                    />
                  </Pressable>
                }
              />
            </Row>
          </Box>
        )
      ) : (
        <Box bg={COLORS.cyan}>
          <Row
            alignItems={'center'}
            justifyContent={'space-between'}
            px={5}
            py={5}>
            <HStack alignItems={'center'} space={5}>
              <Pressable onPress={() => setSelectChat(false)}>
                <Ionicons
                  name="arrow-back-outline"
                  size={27}
                  color={COLORS.textWhite}
                />
              </Pressable>
              <Text fontSize={15} bold>
                {selectedItem.length}
              </Text>
            </HStack>
            <Pressable onPress={() => setOpen(true)}>
              <Ionicons name="ellipsis-vertical" size={25} color={'white'} />
            </Pressable>
          </Row>
        </Box>
      )}
      <ScrollView
        // mt={-10}
        bg={'#111827'}
        overflow={'hidden'}
        borderTopRadius={30}
        showsVerticalScrollIndicator={false}>
        <Box>
          {friendsArray?.map((item: FRIENDS_TYPE, index: number) => (
            <Pressable
              bg={selectChat ? '#1f2937' : '#00000000'}
              borderTopRadius={index === 0 ? 30 : 0}
              pt={index === 0 ? 4 : 0}
              px={4}
              py={2}
              key={item?._id}
              onLongPress={() => handelLongPress(item)}
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
                  {selectChat ? (
                    <Box
                      borderWidth={2}
                      position={'absolute'}
                      bottom={0}
                      right={0}
                      bg={COLORS.cyan}
                      borderRadius={20}
                      alignContent={'center'}
                      justifyContent={'center'}>
                      <Box>
                        <Feather
                          name="check"
                          color={'black'}
                          size={15}
                          style={{
                            padding: 1,
                          }}
                        />
                      </Box>
                    </Box>
                  ) : null}
                </Pressable>
                <VStack flex={1}>
                  <Text
                    fontFamily={'Nunito-Bold'}
                    fontSize={16}
                    color={'white'}>
                    {item?.user?.name}
                  </Text>
                  <Text
                    color={'#94a3b8'}
                    fontFamily={` ${
                      item?.typingStatus ? 'Nunito-Bold' : 'Nunito-Regular'
                    } `}>
                    {item?.typingStatus === true
                      ? 'Typing...'
                      : item?.message?.message}
                  </Text>
                </VStack>
                <Text color={'#94a3b8'} fontSize={11}>
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
      {/* modal */}
      <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
        <Modal.Content w={180} style={styles.top}>
          <Modal.Body>
            <Pressable mb={2}>
              <Text py={2} bold>
                Clear Chat
              </Text>
            </Pressable>
            <Pressable mb={2}>
              <Text py={2} bold>
                Block
              </Text>
            </Pressable>
            <TouchableOpacity
              style={{
                marginBottom: 2,
              }}>
              <Text py={2} bold>
                Mark as read
              </Text>
            </TouchableOpacity>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  top: {
    marginLeft: 'auto',
    marginBottom: 'auto',
    marginTop: 1,
    marginRight: 0,
  },
});
