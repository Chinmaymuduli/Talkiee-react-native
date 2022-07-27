import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Alert,
  Keyboard,
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

type Props = NativeStackScreenProps<PrivateRoutesType, 'ChatDetails'>;

type CHATDATA_TYPE = {
  name?: string;
  profileImage?: string;
  userId?: string;
  status?: string;
};

const ChatDetails = ({navigation, route}: Props) => {
  const chatData: CHATDATA_TYPE = route.params?.item;
  const [messages, setMessages] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);

  const {fetchData, loading} = useDbFetch();

  const {user, socketRef} = useAppContext();

  // console.log('chatData', chatData);

  useEffect(() => {
    socketRef?.current?.on('message-receive', (data: any) => {
      // console.log('message ', data);
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
  }, [socketRef]);

  useEffect(() => {
    //fetch chat data

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
          // console.log('chat', result);
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

  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      socketRef?.current?.emit('typing-off', {
        receiver: chatData?.userId,
        sender: user?._id,
      });
    });

    return () => {
      hideSubscription.remove();
    };
  });

  // console.log(messages[0]);

  // console.log(messages);

  const onSend = useCallback((messages = []) => {
    console.log(messages);

    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages),
    );

    let messageData = {
      receiver: chatData.userId,
      message: messages[0].text,
    };

    // console.log('mm', messageData);

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
        // console.log('send message', result);
        if (response.status !== 200) {
          Alert.alert('Error', result?.message);
        }
      },
    );
  }, []);

  const onChangeText = () => {
    try {
      socketRef?.current?.emit('typing-on', {
        receiver: chatData?.userId,
        sender: user?._id,
      });
    } catch (error) {
      console.log(error);
    }
  };

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

  const renderInputToolbar = (props: any) => {
    return <InputToolbar {...props} containerStyle={styles.input} />;
  };

  const renderComposer = (props: any) => {
    return (
      <Box
        flexDirection={'row'}
        // marginRight={1}
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
                onPress={() => navigation.goBack()}
              />
            </Box>
            <Box>
              <Avatar size={10} source={{uri: chatData?.profileImage}} />
            </Box>
            <VStack>
              <Text color={COLORS.textWhite} bold fontSize={16}>
                {chatData?.name}
              </Text>
              <Text color={COLORS.textWhite}>online</Text>
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
          onInputTextChanged={(text: string) => {
            onChangeText();
          }}
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
    // backgroundColor: '#ecfeff',
    // marginLeft: 10,
    marginRight: 50,
    borderTopWidth: 0,
    // backgroundColor: '#000',
    marginBottom: 2,
    // alignItems: 'center',
  },
  top: {
    marginLeft: 'auto',
    marginBottom: 'auto',
    marginTop: 1,
    marginRight: 0,
  },
});
