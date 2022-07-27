import {StyleSheet, View} from 'react-native';
import React from 'react';
import {
  Box,
  Heading,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {COLORS} from 'configs';
import Feather from 'react-native-vector-icons/Feather';
import Svg, {Circle} from 'react-native-svg';

const Statusbar = [
  {
    label: 'John Deo',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    time: '12 min ago',
  },
  {
    label: 'Willey Jack',
    img: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    time: '1 hour ago',
  },
  {
    label: 'John Deo',
    img: 'https://images.unsplash.com/photo-1492681290082-e932832941e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    time: '2 hour ago',
  },
  {
    label: 'Wiley Jack',
    img: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    time: '3 hour ago',
  },
];

const Status = () => {
  return (
    <Box flex={1} bg={COLORS.textWhite}>
      <Box bg={COLORS.cyan} h={120}></Box>
      <Box mt={-10} bg={COLORS.textWhite} borderTopRadius={30} px={4}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pressable mt={4}>
            <HStack space={4} alignItems={'center'}>
              <Box>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
                  }}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  alt="profile"
                  borderRadius={50}
                />
                <Box
                  position={'absolute'}
                  borderRadius={40}
                  bottom={1}
                  left={9}
                  borderWidth={2}
                  borderColor={COLORS.textWhite}>
                  <Box bg={COLORS.cyan} borderRadius={40}>
                    <Feather name="plus" size={19} color={COLORS.textWhite} />
                  </Box>
                </Box>
              </Box>
              <Box>
                <VStack>
                  <Heading size={'xs'}>Chinmay Muduli</Heading>
                  <Text bold fontSize={13} color={COLORS.grey}>
                    Tap to add status update
                  </Text>
                </VStack>
              </Box>
            </HStack>
          </Pressable>
          <Box mt={5}>
            <Heading size={'xs'} color={COLORS.grey} mb={4}>
              Recent updates
            </Heading>
            {Statusbar.map((item, index) => (
              <HStack key={index} mb={5} space={4} alignItems={'center'}>
                <Box
                  borderWidth={3}
                  borderRadius={40}
                  borderColor={COLORS.cyan}>
                  <Image
                    alt="statusImg"
                    resizeMode="cover"
                    borderRadius={50}
                    source={{
                      uri: item.img,
                    }}
                    style={{
                      width: 50,
                      height: 50,
                    }}
                  />
                </Box>
                <VStack>
                  <Text bold fontSize={14}>
                    {item?.label}
                  </Text>
                  <Text fontSize={13}>{item?.time}</Text>
                </VStack>
              </HStack>
            ))}
          </Box>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default Status;

const styles = StyleSheet.create({});
