import React from 'react';
import {Box, Center, Heading, HStack, Modal, Row, Text} from 'native-base';
import {ImageBackground, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from 'configs';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'routes';
type ModalType = {
  setShowModal: Function;
  showModal: boolean;
  item: any;
};

const ProfileModal = ({setShowModal, showModal, item}: ModalType) => {
  //   console.log('object', item.avatar);
  const navigation = useNavigation<NavigationProps>();
  const chatDetailsNavigate = () => {
    navigation.navigate('ChatDetails', {item});
    setShowModal(false);
  };
  const profileNaviagte = () => {
    navigation.navigate('ProfileDetails', {item});
    setShowModal(false);
  };
  return (
    <>
      {/* <Button onPress={() => setShowModal(true)}>Button</Button> */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        safeAreaTop={true}>
        <Modal.Content maxWidth="400px" style={styles.top}>
          <ImageBackground
            height={300}
            width={300}
            source={{uri: item?.avatar}}
            resizeMode={'cover'}>
            <Box h={250}></Box>
          </ImageBackground>
          <Box px={4} py={2}>
            <HStack justifyContent={'space-between'}>
              <Box>
                <Heading color={'#000'} size={'md'}>
                  {item?.name}
                </Heading>
              </Box>
              <Row space={5}>
                <MaterialCommunityIcons
                  name="android-messages"
                  size={28}
                  color={COLORS.primary}
                  onPress={chatDetailsNavigate}
                />
                <Ionicons
                  name="information-circle-outline"
                  size={28}
                  color={COLORS.primary}
                  onPress={profileNaviagte}
                />
              </Row>
            </HStack>
          </Box>
        </Modal.Content>
      </Modal>
    </>
  );
};
export default ProfileModal;
const styles = StyleSheet.create({
  top: {
    marginBottom: 'auto',
    marginTop: 60,
  },
});
