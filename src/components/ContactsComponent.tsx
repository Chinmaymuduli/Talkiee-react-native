import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Avatar, Box, Pressable, Row, Text, VStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'routes';
import {useDbFetch} from 'hooks';
import {BASE_URL, GET_USER_DETAILS} from 'src/configs/pathConfig';

type CONTACTS_TYPE = {
  contacts: {
    profileImage?: string | any;
    name?: string;
    status?: string;
    _id?: string;
  };
};
const ContactsComponent = ({contacts}: CONTACTS_TYPE) => {
  const navigation = useNavigation<NavigationProps>();

  console.log(contacts);

  const {fetchData, loading} = useDbFetch();

  // useEffect(() => {
  //   let mounted = true;

  //   if (mounted) {
  //     fetchData(
  //       {
  //         method: 'GET',
  //         path:BASE_URL + GET_USER_DETAILS + contacts?._id
  //       },
  //       (result, response) => {},
  //     );
  //   }
  // }, []);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('ChatDetails', {
          item: {
            _id: contacts?._id,
            name: contacts?.name,
            userId: contacts?._id,
            profileImage: contacts?.profileImage,
          },
        })
      }>
      <Row px={4} py={2} space={3} alignItems={'center'}>
        <Box>
          <Avatar source={{uri: contacts.profileImage}} />
        </Box>
        <VStack>
          <Text bold>{contacts.name}</Text>
          <Text>{contacts.status ? contacts.status : ''}</Text>
        </VStack>
      </Row>
    </Pressable>
  );
};

export default ContactsComponent;

const styles = StyleSheet.create({});
