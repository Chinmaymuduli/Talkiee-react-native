import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  Heading,
  HStack,
  Image,
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

// import {PermissionsAndroid} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
const chatArr = [
  {
    id: 1,
    name: 'Mahakal',
    avatar: 'https://source.unsplash.com/user/c_v_r',
    Message: 'Hello user message',
    time: '12:00 am',
  },
  {
    id: 2,
    name: 'Ipl2022',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500',
    Message: 'Hello user message',
    time: '12:00 am',
  },
];

const GroupChat = () => {
  const navigation = useNavigation<NavigationProps>();
  const [showModal, setShowModal] = useState(false);
  const [item, setItem] = useState<any[]>();
  const [open, setOpen] = useState(false);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#06b6d4'}}>
      <Box bg={COLORS.cyan} position={'relative'} zIndex={9999}>
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
              Groups
            </Heading>
          </Box>
          <HStack alignItems={'center'} space={5}>
            <Ionicons
              name="search-outline"
              size={25}
              color={COLORS.textWhite}
            />
            <Pressable
              onPress={() =>
                navigation.navigate('ContactsList', {isGroup: true})
              }>
              <AntDesign name="plus" color={'white'} size={28} />
            </Pressable>
          </HStack>
        </Row>
      </Box>

      {/* <Box> */}
      <ScrollView
        bg={COLORS.textWhite}
        borderTopRadius={30}
        showsVerticalScrollIndicator={false}>
        <Box mt={3}>
          {chatArr.map((item: any) => (
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
                  <Image
                    alt="image"
                    source={{
                      uri: item?.avatar,
                    }}
                    h={12}
                    w={12}
                    borderRadius={30}
                  />
                </Pressable>
                <VStack flex={1}>
                  <Text fontFamily={'Nunito-Bold'} fontSize={16}>
                    {item?.name}
                  </Text>
                  <Text fontFamily={'Nunito-Regular'}>this is message</Text>
                </VStack>
                <Text>{item?.time}</Text>
              </Row>
            </Pressable>
          ))}
        </Box>
      </ScrollView>
      {/* </Box> */}

      {/* Modal Component */}
      <ProfileModal
        showModal={showModal}
        setShowModal={setShowModal}
        item={item}
      />
      {/* animation */}
    </SafeAreaView>
  );
};

export default GroupChat;

const styles = StyleSheet.create({
  top: {
    marginLeft: 'auto',
    marginBottom: 'auto',
    marginTop: 1,
    marginRight: 0,
  },
});
