import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, Box, Image, Pressable, Row, Text, VStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'routes';
import {useDbFetch} from 'hooks';
import {BASE_URL, GET_USER_DETAILS} from 'src/configs/pathConfig';
import AntDesign from 'react-native-vector-icons/AntDesign';

type CONTACTS_TYPE = {
  contacts: {
    profileImage?: string | any;
    name?: string;
    status?: string;
    _id?: string;
    isGroup?: boolean;
  };
};
const ContactsComponent = ({contacts}: CONTACTS_TYPE) => {
  const navigation = useNavigation<NavigationProps>();
  const [selectedPeople, setSelectedPeople] = useState(false);

  console.log('contacts');

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
      onPress={
        () =>
          // !contacts.isGroup
          // ?
          navigation.navigate('ChatDetails', {
            item: {
              _id: contacts?._id,
              name: contacts?.name,
              userId: contacts?._id,
              profileImage: contacts?.profileImage,
            },
          })
        // : setSelectedPeople(true)
      }>
      <Row px={4} py={2} space={3} alignItems={'center'}>
        <Box>
          {/* {!selectedPeople ? ( */}
          <Avatar source={{uri: contacts.profileImage}} />
          {/* ) : (
            <Box
              bg={'green.400'}
              style={{
                height: 48,
                width: 48,
              }}
              borderRadius={30}
              alignItems={'center'}
              justifyContent={'center'}>
              <AntDesign name="check" size={25} color={'white'} />
            </Box>
          )} */}

          {/* <Image
            alt="image"
            source={{
              uri: contacts.profileImage
                ? contacts.profileImage
                : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH4AfgMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQIFBAMGB//EADQQAAIBAgIIAgcJAAAAAAAAAAABAgMRBAUTISIxQVGBwRJxIzIzUmGx8SQ0QmKCkaHR4f/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEB/9oADAMBAAIRAxEAPwD9cABUAAAAAAAAAAAAABsqyWyoBkXDIYHqAAAAAESkoxcpNKKV22TKSjFuTskrswsbi5YmeptU16se7A7a+aQi7UYeN83qRyyzPEt6vBHocQEHfDNK6e1GEl5WO3DZhRrNRl6OT4Pc+phgQfTkNmVl2OakqFZ3T1Qk+HwNRgQRclsqwBW5NyrA6AAAAAGfnFZxpwoxdnPW/IyDtzZ3xklySXfucRQAAAAgBfkb2DrafDQm3eW6XmYBqZPL0VWPBSX8/QaNFlQVbIDZVhsrcDsAAAAAY2bwccX4vein2OE280oaWgpxW1T1+a4mIAAIZQuQCGANXJ42ozk/xS+X1MqKcpKMVdt2SN+hSVCjCmnuWt/EaPRsq2GyrIIZW5LKNgaAAAAAAZOPwEoN1aCvF63FcP8ADWPGviqND2lRJ8t7A+eIbNp08FjdcXHxc4uz/Y8ZZTG+zVfVXLRkkxi5yUYptvckakcqpp3nUnJckrF1VweD2YuKf5dp9RRXA4PQLSVPacF7p1tlYVadWN6U4y8mSyCGVbDZVsBcow2VYGoAABFScacHObtFK7ZJiZlitPV8EX6OG74vmBbF5jUqtxpNwhzW9nAxcgohl1Xqx9WrNfqZQhgWnUqT9ecpecrnncllbgSpOLvBtPmjQwuY3ahX6T/szWyrYH0bZRs4MtxTktBJ60tlviuR2yZBDZVsNlWwNgAAc+YVtDhZyTtJ7KPnzVzuWzShzbZksYBAIKDIYIbAMqCrANlWxchgWp1HTqRmt8Xc3FJSipLc1dHz7NjAy8WEpt8rEHuVYZAG0Q2SyoGXnW+j17GWaedb6PXsZgwQyGGQUGypJVgGyrYKsAyrZLZVgGa2Xv7JDr8zHbNfL/ukOvzIOggkID//2Q==',
            }}
            h={20}
            w={20}

          /> */}
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
