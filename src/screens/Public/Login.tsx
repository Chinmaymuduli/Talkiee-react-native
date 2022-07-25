import {Controller, useForm} from 'react-hook-form';
import {GlobalStyles, LoginStyles} from 'styles';
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
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PublicRoutesType} from 'routes';
import {useAppContext} from 'context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, LOGIN} from '../../configs/pathConfig';

type Props = NativeStackScreenProps<PublicRoutesType, 'Login'>;
const Login = ({navigation}: Props) => {
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
  const [eyeVisible, setEyeVisible] = useState(false);

  const {setConfirm, setUser} = useAppContext();

  const onSubmit = async (data: any) => {
    // console.log('object', data);

    const phoneNumber = `${phoneCode}${data.Number}`;

    const loginData = {
      phone: phoneNumber,
      password: data?.Password,
    };
    //fetching data to server
    try {
      setLoader(true);

      const respose = await fetch(BASE_URL + LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await respose.json();
      console.log('object', data);

      if (respose.status !== 200) {
        // navigation.navigate('Confirm');
        Alert.alert('Error', data.message);
        return;
      }
      await AsyncStorage.setItem('tokenId', data.data.token);
      setUser(data?.data.data);
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
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
        backgroundColor={COLORS.cyan}
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
            // alignItems={'center'}
            justifyContent={'center'}
            bg={COLORS.cyan}
            w={'100%'}
            h={Dimensions.get('window').height / 3}
            borderBottomRightRadius={220}>
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

          <Box alignItems={'center'} mt={12} mb={2}>
            <VStack>
              <Heading
                color={COLORS.cyan}
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
                  fontWeight: '200',
                }}>
                Login or Create account quickly to manage your chat
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
                        borderRadius={30}
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

                <FormControl isRequired isInvalid={'Password' in errors}>
                  <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        placeholder="Enter Password"
                        size="xl"
                        backgroundColor={COLORS.textWhite}
                        borderColor={COLORS.whiteSmoke}
                        fontSize={20}
                        secureTextEntry={eyeVisible ? false : true}
                        type="password"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        InputLeftElement={
                          <Box
                            alignItems={'center'}
                            justifyContent={'center'}
                            h={'100%'}
                            borderRightWidth={1}
                            // onPress={() => setModalVisible(true)}
                            borderRightColor={COLORS.fadeBlack}>
                            <Ionicons
                              name="key-outline"
                              size={25}
                              color={COLORS.fadeBlack}
                              style={{
                                marginLeft: 15,
                                marginRight: 10,
                              }}
                            />
                          </Box>
                        }
                        InputRightElement={
                          <Ionicons
                            name={eyeVisible ? 'eye-off' : 'eye'}
                            size={25}
                            color={COLORS.cyan}
                            onPress={() => setEyeVisible(!eyeVisible)}
                            style={{
                              marginRight: 15,
                            }}
                          />
                        }
                        borderRadius={30}
                        padding={3}
                        bg={COLORS.transparent}
                        shadow={3}
                        height={60}
                      />
                    )}
                    name="Password"
                    rules={{
                      required: 'Password  is required',
                    }}
                    defaultValue=""
                  />

                  <FormControl.ErrorMessage>
                    {errors.Password?.message}
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
                      Please Wait
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
                    fontSize={20}
                    color={COLORS.textWhite}>
                    Login
                  </Button>
                )}
              </Stack>

              <TouchableOpacity
                style={GlobalStyles.m_t_10}
                onPress={() => navigation.navigate('Register')}>
                <Heading
                  mt={1}
                  textAlign={'center'}
                  size={'sm'}
                  color={COLORS.cyan}
                  fontFamily="Nunito-Bold"
                  fontWeight={200}>
                  Don't have an account? Sign Up
                </Heading>
              </TouchableOpacity>
            </VStack>
          </Box>
        </ScrollView>

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
