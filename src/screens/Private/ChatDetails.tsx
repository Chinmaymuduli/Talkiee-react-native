import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Alert,
  Keyboard,
  BackHandler,
  AppState,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'routes';
import {Avatar, Box, HStack, Modal, Pressable, Text, VStack} from 'native-base';
import {COLORS} from 'configs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
  Composer,
} from 'react-native-gifted-chat';
import Feather from 'react-native-vector-icons/Feather';
import {useAppContext} from 'context';
import {CHATBG} from 'assets';
import {useDbFetch} from 'hooks';
import {BASE_URL, PRIVATE_MESSAGE} from '../../configs/pathConfig';
import {CHAT_DETAILS_DATA_TYPE} from 'types';

type Props = NativeStackScreenProps<PrivateRoutesType, 'ChatDetails'>;

const ChatDetails = ({navigation, route}: Props) => {
  const [messages, setMessages] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [userTyping, setUserTyping] = useState<boolean>(false);
  const [userOnline, setUserOnline] = useState<boolean>(false);

  const {fetchData, loading} = useDbFetch();
  const {user, socketRef} = useAppContext();

  const chatData: CHAT_DETAILS_DATA_TYPE = route.params?.item;
  const [userLastSeen, setUserLastSeen] = useState<string>(
    chatData?.lastSeen || '',
  );

  //user Typing event this will fire the socket when user start and stop typing.

  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      socketRef?.current?.emit('typing-off', {
        receiver: chatData?.userId,
        sender: user?._id,
      });
    });

    const showsKeyboard = Keyboard.addListener('keyboardDidShow', () => {
      socketRef?.current?.emit('typing-on', {
        receiver: chatData?.userId,
        sender: user?._id,
      });
    });

    BackHandler.addEventListener('hardwareBackPress', handleNavigation);

    const appStateListener = AppState.addEventListener(
      'change',
      (nextAppState: string) => {
        if (nextAppState === 'background') {
          socketRef?.current?.emit('typing-off', {
            receiver: chatData?.userId,
            sender: user?._id,
          });
        }
      },
    );

    return () => {
      hideSubscription.remove();
      showsKeyboard.remove();
      BackHandler.removeEventListener('hardwareBackPress', handleNavigation);
      appStateListener.remove();
    };
  }, []);

  //this socket event is for listening user receive message

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      socketRef?.current?.on('message-receive', (data: any) => {
        if (data?.userId === chatData?.userId) {
          let messages = [
            {
              _id: data?._id,
              createdAt: new Date(data?.createdAt),
              text: data?.message,
              user: {
                _id: data?.sender,
              },
            },
          ];

          setMessages((previousMessages: any) =>
            GiftedChat.append(previousMessages, messages),
          );
        }
      });
      socketRef?.current?.on('typing-user', (data: any) => {
        if (data?.sender === chatData?.userId) {
          setUserTyping(true);
        }
      });
      socketRef?.current?.on('typing-off-user', (data: any) => {
        if (data?.sender === chatData?.userId) {
          setUserTyping(false);
        }
      });
      socketRef?.current?.on('user-comes-online', (data: any) => {
        if (data === chatData?.userId) {
          setUserOnline(true);
        }
      });
      socketRef?.current?.on('user-goes-offline', (data: any) => {
        if (data?.userId === chatData?.userId) {
          setUserOnline(false);
          setUserLastSeen(data?.timestamps);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [socketRef]);

  //initial message fetching function

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      // console.log('chatData', chatData.userId);
      fetchData(
        {
          method: 'GET',
          path: BASE_URL + PRIVATE_MESSAGE + `/${chatData?.userId}`,
          headers: {
            'Content-Type': 'application/json',
          },
        },
        (result, response) => {
          if (response.status === 200) {
            let messageData = result?.data?.map((item: any) => {
              return {
                _id: item?._id,
                text: item.message,
                createdAt: item.createdAt,
                user: {
                  _id:
                    item.sender === chatData?.userId
                      ? chatData?.userId
                      : user._id,
                  name: user?._id === item.receiver ? chatData.name : '',
                  avatar: user?._id === item.receiver && chatData.profileImage,
                },
              };
            });
            setMessages(messageData);
          }
        },
      );
    }

    return () => {
      mounted = false;
    };
  }, [chatData?.userId]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages),
    );

    let messageData = {
      receiver: chatData.userId,
      message: messages[0].text,
    };

    socketRef?.current.emit('send-message', {
      message: messages[0].text,
      userId: user?._id,
      // conversationId: chatData?._id,
      receiver: chatData?.userId,
      sender: user?._id,
      seen: false,
      delivered: true,
      createdAt: Date.now(),
      _id: Date.now(),
    });

    fetchData(
      {
        method: 'POST',
        path: BASE_URL + PRIVATE_MESSAGE,
        body: JSON.stringify(messageData),
        headers: {
          'Content-Type': 'application/json',
        },
      },
      (result, response) => {
        if (response.status !== 200) {
          Alert.alert('Error', result?.message);
        }
      },
    );
  }, []);

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: COLORS.cyan,
          },
        }}
      />
    );
  };

  const renderSend = (props: any) => {
    if (!props.text.trim()) {
      return (
        <Box
          bg={COLORS.cyan}
          borderRadius={30}
          alignItems={'center'}
          mb={1}
          ml={1}>
          <Ionicons
            name="mic"
            size={27}
            color={COLORS.textWhite}
            style={{padding: 6}}
          />
        </Box>
      );
    }
    return (
      <Send {...props}>
        <Box
          bg={COLORS.cyan}
          borderRadius={40}
          alignItems={'center'}
          mt={1}
          ml={1}>
          <Feather
            name="send"
            size={24}
            color={COLORS.textWhite}
            style={{padding: 8}}
          />
        </Box>
      </Send>
    );
  };

  const handleNavigation = () => {
    try {
      socketRef?.current?.emit('typing-off', {
        receiver: chatData?.userId,
        sender: user?._id,
      });

      navigation.goBack();

      return true;
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const renderInputToolbar = (props: any) => {
    return <InputToolbar {...props} containerStyle={styles.input} />;
  };

  const renderComposer = (props: any) => {
    return (
      <Box
        flexDirection={'row'}
        bg={'#ecfeff'}
        paddingRight={2}
        alignItems={'center'}
        borderRadius={50}>
        <Composer {...props} />

        <Fontisto
          name="smiley"
          size={22}
          color={COLORS.cyan}
          style={{
            marginRight: 10,
          }}
        />
        <Ionicons name="attach" size={27} color={COLORS.cyan} />
      </Box>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Box bg={COLORS.cyan} h={120} px={4} py={4}>
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          {/* //left side */}
          <HStack space={3}>
            <Box>
              <Ionicons
                name="arrow-back"
                size={30}
                color="white"
                onPress={() => handleNavigation()}
              />
            </Box>
            <Box>
              <Avatar size={10} source={{uri: chatData?.profileImage}} />
            </Box>
            <VStack>
              <Text color={COLORS.textWhite} bold fontSize={16}>
                {chatData?.name}
              </Text>

              {userTyping ? (
                <Text color={COLORS.cyan}>Typing...</Text>
              ) : (
                <Text color={COLORS.textWhite}>
                  {userOnline ? 'Online' : userLastSeen}
                </Text>
              )}
            </VStack>
          </HStack>
          {/* //right side */}
          <HStack space={5}>
            <Box>
              <Ionicons name="call" color={COLORS.textWhite} size={22} />
            </Box>
            <Pressable onPress={() => setOpen(!open)}>
              <Ionicons
                name="ellipsis-vertical"
                size={22}
                color={COLORS.textWhite}
              />
            </Pressable>
          </HStack>
        </HStack>
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
              <Pressable
                onPress={() =>
                  navigation.navigate('ProfileDetails', {
                    item: chatData,
                  })
                }>
                <Text py={2} bold>
                  View Profile
                </Text>
              </Pressable>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Box>
      <ImageBackground
        source={CHATBG}
        borderTopLeftRadius={30}
        borderTopRightRadius={30}
        resizeMode={'cover'}
        style={{
          flex: 1,
          marginTop: -30,
        }}>
        <GiftedChat
          messages={messages?.sort((a: any, b: any) => {
            return b.createdAt - a.createdAt;
          })}
          onSend={messages => onSend(messages)}
          user={{
            _id: user?._id,
          }}
          renderBubble={renderBubble}
          alwaysShowSend
          renderSend={renderSend}
          scrollToBottom
          renderInputToolbar={props => renderInputToolbar(props)}
          renderComposer={props => renderComposer(props)}
          listViewProps={{
            styles: {
              backgroundColor: 'red',
            },
          }}
          // renderActions={() => (
          //   <Actions
          //     icon={() => (
          //       <Fontisto
          //         name="smiley"
          //         size={20}
          //         color={COLORS.fadeBlack}
          //         // style={{marginRight: -10}}
          //       />
          //     )}
          //   />
          // )}
        />
        {/* </Box> */}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ChatDetails;

const styles = StyleSheet.create({
  input: {
    borderRadius: 30,
    marginRight: 50,
    borderTopWidth: 0,
    marginBottom: 2,
  },
  top: {
    marginLeft: 'auto',
    marginBottom: 'auto',
    marginTop: 1,
    marginRight: 0,
  },
});
