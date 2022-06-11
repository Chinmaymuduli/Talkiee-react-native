import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'routes';
import {Avatar, Box, HStack, Text, VStack} from 'native-base';
import {COLORS} from 'configs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Props = NativeStackScreenProps<PrivateRoutesType, 'ChatDetails'>;
const ChatDetails = ({navigation, route}: Props) => {
  const chatData = route.params?.item;
  // console.log('object', chatData);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'hiiifddd',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
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
    return (
      <Send {...props}>
        <Box>
          <Ionicons
            name="send"
            size={24}
            color={COLORS.cyan}
            style={{marginBottom: 6}}
          />
        </Box>
      </Send>
    );
  };
  // const scrollToBottomComponent = () => {
  //   return <FontAwesome name="angle-double-down" size={22} color={'#333'} />;
  // };
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
            <Box>
              <Ionicons
                name="ellipsis-vertical"
                size={22}
                color={COLORS.textWhite}
              />
            </Box>
          </HStack>
        </HStack>
      </Box>
      <Box bg={COLORS.textWhite} mt={-10} borderTopRadius={30} flex={1} px={4}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
          renderBubble={renderBubble}
          alwaysShowSend
          renderSend={renderSend}
          scrollToBottom
          // scrollToBottomComponent={scrollToBottomComponent}
        />
      </Box>
    </SafeAreaView>
  );
};

export default ChatDetails;

const styles = StyleSheet.create({});
