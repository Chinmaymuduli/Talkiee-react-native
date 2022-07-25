import {InteractionManager, StyleSheet} from 'react-native';
import React from 'react';
import {
  Box,
  FlatList,
  Heading,
  HStack,
  Pressable,
  Row,
  ScrollView,
  Text,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'routes';
import {COLORS} from 'configs';
import {ContactsComponent} from 'components';

const contactArr = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://source.unsplash.com/user/c_v_r',
    status: 'Hey! i am using talkiee',
  },
  {
    id: 2,
    name: 'Sara Doe',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500',
    status: 'Hey! i am using talkiee',
  },
  {
    id: 3,
    name: 'willey John',
    avatar:
      'https://images.unsplash.com/photo-1491349174775-aaafddd81942?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500',
    status: 'Hey! i am using talkiee',
  },
  {
    id: 4,
    name: 'Vikram Doe',
    avatar: 'https://source.unsplash.com/user/c_v_r',
    status: 'Hey! i am using talkiee',
  },
];

type Props = NativeStackScreenProps<PrivateRoutesType, 'ContactsList'>;
const ContactsList = ({route, navigation}: Props) => {
  return (
    <Box flex={1}>
      <HStack
        alignItems={'center'}
        justifyContent={'space-between'}
        px={4}
        bg={COLORS.cyan}>
        <Row alignItems={'center'} space={4} py={3}>
          <Ionicons
            name="arrow-back"
            size={30}
            color={'white'}
            onPress={() => navigation.goBack()}
          />
          <Heading size={'md'} color={'white'}>
            Select contact
          </Heading>
        </Row>
        <Box py={3}>
          <Ionicons name="search-outline" size={25} color={'white'} />
        </Box>
      </HStack>
      {/* <ScrollView>
        <HStack py={5} px={5} alignItems={'center'} space={4}>
          <Box bg={COLORS.cyan} borderRadius={20}>
            <Ionicons
              name="people"
              size={27}
              color={'white'}
              style={{
                padding: 6,
              }}
            />
          </Box>
          <Heading size={'sm'}>Create Group</Heading>
        </HStack>
        <Text bold color={COLORS.grey} px={5}>
          Contacts on Talkiee
        </Text>
      </ScrollView> */}
      <FlatList
        data={contactArr}
        renderItem={({item}) => <ContactsComponent contacts={item} />}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <>
            {route.params?.isGroup ? null : (
              <Pressable
                onPress={() =>
                  navigation.navigate('ContactsList', {
                    isGroup: true,
                  })
                }>
                <HStack pt={5} px={5} alignItems={'center'} space={4}>
                  <Box bg={COLORS.cyan} borderRadius={20}>
                    <Ionicons
                      name="people"
                      size={27}
                      color={'white'}
                      style={{
                        padding: 6,
                      }}
                    />
                  </Box>
                  <Heading size={'sm'}>Create Group</Heading>
                </HStack>
              </Pressable>
            )}
            <Text bold color={COLORS.grey} px={5} mb={2} mt={3}>
              Contacts on Talkiee
            </Text>
          </>
        }
      />
    </Box>
  );
};

export default ContactsList;

const styles = StyleSheet.create({});
