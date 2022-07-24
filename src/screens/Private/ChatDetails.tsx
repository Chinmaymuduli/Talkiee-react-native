import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'routes';
import {
  Avatar,
  Box,
  HStack,
  Icon,
  Modal,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import {COLORS} from 'configs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
  Actions,
  Composer,
} from 'react-native-gifted-chat';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppContext} from 'context';
import {CHATBG} from 'assets';

type Props = NativeStackScreenProps<PrivateRoutesType, 'ChatDetails'>;
const ChatDetails = ({navigation, route}: Props) => {
  const chatData = route.params?.item;
  const [messages, setMessages] = useState([]);
  const {user} = useAppContext();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    //fetch chat data
    const CHATDATA = async () => {
      const token = await AsyncStorage.getItem('tokenId');
      const CHATDATA = await fetch(
        `https://talkieeapp.herokuapp.com/message/private/${chatData._id}`,
        {
          method: 'Get',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await CHATDATA.json();
      // console.log('object69', data);

      if (CHATDATA.status !== 200) {
        setMessages([]);
        return;
      }

      let messageData = data?.data?.messages?.map((item: any) => {
        return {
          _id: item?._id,
          text: item.message,
          createdAt: item.createdAt,
          user: {
            _id: item.sender === chatData?._id ? chatData._id : user._id,
            name: user?._id === item.receiver ? chatData.name : '',
            avatar: user?._id === item.receiver && chatData.avatar,
          },
        };
      });

      setMessages(messageData);

      // console.log('object', data);
    };
    CHATDATA();
  }, []);

  // console.log(messages);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );

    const sendToDb = async () => {
      try {
        const token = await AsyncStorage.getItem('tokenId');

        const sendData = {
          message: messages[0].text,
          to: chatData._id,
        };

        const response = await fetch(
          'https://talkieeapp.herokuapp.com/message/private',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(sendData),
          },
        );

        const data = await response.json();
      } catch (error) {
        console.log(error);
      }
    };
    sendToDb();
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
              <Avatar size={10} source={{uri: chatData?.avatar}} />
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
        {/* <Box
          bg={COLORS.fadeBlack}
          mt={-10}
          borderTopRadius={30}
          flex={1}
          pl={2}> */}
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
