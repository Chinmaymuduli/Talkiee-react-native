import {StyleSheet} from 'react-native';
import React from 'react';
import {Avatar, Box, Pressable, Row, Text, VStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'routes';

type CONTACTS_TYPE = {
  contacts: {
    avatar?: string | any;
    name?: string;
    status?: string;
  };
};
const ContactsComponent = ({contacts}: CONTACTS_TYPE) => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('ChatDetails', {
          item: contacts,
        })
      }>
      <Row px={4} py={2} space={3} alignItems={'center'}>
        <Box>
          <Avatar source={{uri: contacts.avatar}} />
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
