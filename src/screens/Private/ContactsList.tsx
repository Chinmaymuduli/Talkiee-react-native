import {InteractionManager, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  Center,
  Fab,
  FlatList,
  Heading,
  HStack,
  Icon,
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
import {useAppContext} from 'context';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = NativeStackScreenProps<PrivateRoutesType, 'ContactsList'>;
const ContactsList = ({route, navigation}: Props) => {
  const [myContacts, setMyContacts] = useState<any[]>([]);

  const {contactUsers} = useAppContext();

  console.log('contact', contactUsers);

  return (
    <Box flex={1} bg={'white'}>
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
        data={contactUsers}
        renderItem={({item}: any) => (
          <ContactsComponent
            contacts={{
              profileImage: item?.profileImage,
              name: item?.name,
              status: item?.status,
              _id: item?._id,
              isGroup: route.params?.isGroup,
            }}
          />
        )}
        keyExtractor={(item: any, index) => index.toString()}
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
      {/* fab */}
      {route.params?.isGroup ? (
        <Box mr={4} mb={4}>
          <Fab
            renderInPortal={false}
            shadow={2}
            size="sm"
            icon={
              <Icon color="white" as={AntDesign} name="arrowright" size="lg" />
            }
          />
        </Box>
      ) : null}
    </Box>
  );
};

export default ContactsList;

const styles = StyleSheet.create({});
