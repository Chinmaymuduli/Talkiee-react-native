import {Controller, useForm} from 'react-hook-form';
import {GlobalStyles, LoginStyles} from 'styles';
import LottieView from 'lottie-react-native';
import {chattingAnimation} from 'assets';
import {COLORS} from 'configs';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ArrowForwardIcon,
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Pressable,
  ScrollView,
  Stack,
  StatusBar,
  VStack,
  Text,
  Image,
  HStack,
  Divider,
  Spinner,
  FlatList,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CountryCode} from '../../constants';

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [loader, setLoader] = React.useState(false);
  const [phoneCode, setPhoneCode] = React.useState<string>('+91');
  const [allData, setAllData] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const totalCountry = CountryCode;
  const [search, setSearch] = useState('');
  const [countryData, setCountryData] = useState<any>([]);

  const onSubmit = async (data: any) => {
    console.log('object', data);
  };

  const onItemPress = (item: any) => {
    setPhoneCode(`+${item?.phone}`);
    setModalVisible(false);
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity onPress={() => onItemPress(item)}>
      <HStack py={4} px={5}>
        {item.code ? (
          <Image
            alt="image"
            source={{
              uri: `https://flagcdn.com/w20/${item.code.toLowerCase()}.png`,
            }}
            style={{
              width: 20,
              height: 20,
            }}
            resizeMode="contain"
          />
        ) : null}
        <Text ml={3}> +{item.phone}</Text>
        <Text ml={5}>{item.label}</Text>
      </HStack>
      <Divider />
    </TouchableOpacity>
  );

  // search country
  useEffect(() => {
    if (search) {
      const newData = totalCountry.filter((item: any) => {
        return item.label.toLowerCase().includes(search.toLowerCase());
      });
      setCountryData(newData);
    } else {
      setCountryData(totalCountry);
    }
  }, [search, totalCountry]);

  return (
    <>
      <StatusBar
        backgroundColor={COLORS.primary}
        // translucent={true}
        barStyle={'light-content'}
      />
      <SafeAreaView
        style={[
          LoginStyles.root,
          {
            backgroundColor: COLORS.textWhite,
          },
        ]}>
        <ScrollView>
          <Box
            alignItems={'center'}
            justifyContent={'center'}
            bg={COLORS.primary}
            w={'100%'}
            h={Dimensions.get('window').height / 3}
            borderBottomRightRadius={250}>
            <Box alignItems={'center'}>
              <Image
                alt="logo"
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_CQ3IrjZcisW-FO12jxRtSA9shZYuykqA2w&usqp=CAU',
                }}
                h={20}
                w={20}
                borderRadius={40}
                resizeMode="cover"
              />
              <Text
                mt={2}
                color={COLORS.textWhite}
                fontFamily={'Nunito-Bold'}
                letterSpacing={1}>
                Talkiee
              </Text>
            </Box>
          </Box>

          <Box alignItems={'center'} mt={7}>
            <VStack>
              <Heading
                color={COLORS.primary}
                fontSize={38}
                fontFamily="Nunito-Bold"
                fontWeight={200}>
                Welcome Back,
              </Heading>
              <Text
                style={{
                  fontSize: 17,
                  color: COLORS.fadeBlack,
                  fontFamily: 'Nunito-Regular',
                }}>
                Login or Create account quickly to manage your orders
              </Text>

              <Stack mt={5} space={2}>
                <FormControl isRequired isInvalid={'Number' in errors}>
                  <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        placeholder="Enter Mobile Number"
                        size="xl"
                        keyboardType="numeric"
                        backgroundColor={COLORS.textWhite}
                        borderColor={COLORS.whiteSmoke}
                        fontSize={20}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        InputLeftElement={
                          <Pressable
                            alignItems={'center'}
                            justifyContent={'center'}
                            h={'100%'}
                            borderRightWidth={1}
                            onPress={() => setModalVisible(true)}
                            borderRightColor={COLORS.fadeBlack}>
                            <Heading
                              size={'md'}
                              color={COLORS.fadeBlack}
                              ml={2}
                              mr={2}>
                              {phoneCode}
                            </Heading>
                          </Pressable>
                        }
                        borderRadius={10}
                        padding={3}
                        bg={COLORS.transparent}
                        shadow={3}
                        height={60}
                      />
                    )}
                    name="Number"
                    rules={{
                      required: 'Phone Number is required',
                    }}
                    defaultValue=""
                  />

                  <FormControl.ErrorMessage>
                    {errors.Number?.message}
                  </FormControl.ErrorMessage>
                </FormControl>

                {loader ? (
                  <HStack
                    space={2}
                    style={LoginStyles.sendOtpButton}
                    justifyContent="center">
                    <Spinner
                      accessibilityLabel="Loading posts"
                      color={'white'}
                    />
                    <Heading color="white" fontSize="md" mt={1}>
                      Sending OTP
                    </Heading>
                  </HStack>
                ) : (
                  <Button
                    colorScheme="primary"
                    endIcon={
                      <ArrowForwardIcon size="5" color={COLORS.textWhite} />
                    }
                    style={LoginStyles.sendOtpButton}
                    onPress={handleSubmit(onSubmit)}
                    fontSize="18"
                    color={COLORS.textWhite}>
                    Send OTP
                  </Button>
                )}
              </Stack>

              <TouchableOpacity
                style={GlobalStyles.m_t_10}
                // onPress={() => navigation.navigate('Register')}
              >
                <Heading
                  mt={1}
                  textAlign={'center'}
                  size={'sm'}
                  color={'#133373'}
                  fontFamily="Nunito-Regular"
                  fontWeight={200}>
                  Don't have an account? Sign Up
                </Heading>
              </TouchableOpacity>
            </VStack>
          </Box>
        </ScrollView>
        {/* <ScrollView
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}>
          <Center h={Dimensions.get('window').height * 0.4}>
            <LottieView source={chattingAnimation} autoPlay loop={true} />
          </Center>

          <Box alignItems={'center'}>
            <VStack>
              <Heading
                color={COLORS.primary}
                fontSize={38}
                fontFamily="Nunito-Bold"
                fontWeight={200}>
                Welcome Back,
              </Heading>
              <Text
                style={{
                  fontSize: 17,
                  color: COLORS.fadeBlack,
                  fontFamily: 'Nunito-Regular',
                }}>
                Login or Create account quickly to manage your orders
              </Text>

              <Stack mt={5} space={2}>
                <FormControl isRequired isInvalid={'Number' in errors}>
                  <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        placeholder="Enter Mobile Number"
                        size="xl"
                        keyboardType="numeric"
                        backgroundColor={COLORS.textWhite}
                        borderColor={COLORS.whiteSmoke}
                        fontSize={20}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        InputLeftElement={
                          <Pressable
                            alignItems={'center'}
                            justifyContent={'center'}
                            h={'100%'}
                            borderRightWidth={1}
                            onPress={() => setModalVisible(true)}
                            borderRightColor={COLORS.fadeBlack}>
                            <Heading
                              size={'md'}
                              color={COLORS.fadeBlack}
                              ml={2}
                              mr={2}>
                              {phoneCode}
                            </Heading>
                          </Pressable>
                        }
                        borderRadius={10}
                        padding={3}
                        bg={COLORS.transparent}
                        shadow={3}
                        height={60}
                      />
                    )}
                    name="Number"
                    rules={{
                      required: 'Phone Number is required',
                    }}
                    defaultValue=""
                  />

                  <FormControl.ErrorMessage>
                    {errors.Number?.message}
                  </FormControl.ErrorMessage>
                </FormControl>

                {loader ? (
                  <HStack
                    space={2}
                    style={LoginStyles.sendOtpButton}
                    justifyContent="center">
                    <Spinner
                      accessibilityLabel="Loading posts"
                      color={'white'}
                    />
                    <Heading color="white" fontSize="md" mt={1}>
                      Sending OTP
                    </Heading>
                  </HStack>
                ) : (
                  <Button
                    colorScheme="primary"
                    endIcon={
                      <ArrowForwardIcon size="5" color={COLORS.textWhite} />
                    }
                    style={LoginStyles.sendOtpButton}
                    onPress={handleSubmit(onSubmit)}
                    fontSize="18"
                    color={COLORS.textWhite}>
                    Send OTP
                  </Button>
                )}
              </Stack>

              <TouchableOpacity
                style={GlobalStyles.m_t_10}
                // onPress={() => navigation.navigate('Register')}
              >
                <Heading
                  mt={1}
                  textAlign={'center'}
                  size={'sm'}
                  color={'#133373'}
                  fontFamily="Nunito-Regular"
                  fontWeight={200}>
                  Don't have an account? Sign Up
                </Heading>
              </TouchableOpacity>
            </VStack>
          </Box>
        </ScrollView> */}
        {/* modal open */}

        <View style={styles.wrapper}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <HStack px={12} mt={2}>
                <Input
                  onChangeText={value => setSearch(value)}
                  placeholder="Search by country"
                  fontFamily={'Nunito-Bold'}
                  flex={1}
                  h={10}
                  fontSize={15}
                  pl={5}
                />
                <TouchableOpacity
                  style={styles.logo}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Ionicons name="close" size={25} />
                </TouchableOpacity>
              </HStack>
              <View style={styles.modalView}>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <FlatList
                    initialNumToRender={20}
                    windowSize={6}
                    maxToRenderPerBatch={15}
                    showsVerticalScrollIndicator={false}
                    data={countryData}
                    renderItem={renderItem}
                    keyExtractor={(item: any) => item.code.toString()}
                  />
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        {/* end  */}
      </SafeAreaView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  centeredView: {
    backgroundColor: '#fff',
    minHeight: Dimensions.get('window').height,
  },
  modalView: {
    borderRadius: 10,
    paddingTop: 10,
  },
  button: {
    paddingLeft: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#000',
  },

  logo: {
    position: 'absolute',
    top: 5,
    right: 10,
    color: '#000',
  },
  iconMenu: {
    marginRight: 10,
  },
});
