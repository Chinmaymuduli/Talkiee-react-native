import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
// import {useNavigation} from '@react-navigation/native';
import {GlobalStyles, LoginStyles} from 'styles';
import {Controller, useForm} from 'react-hook-form';
// import LottieView from 'lottie-react-native';
// import {registration} from '../assets';
import {COLORS} from 'configs';
import {
  Alert,
  Dimensions,
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Box,
  Center,
  Divider,
  FlatList,
  FormControl,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Pressable,
  Radio,
  ScrollView,
  Spinner,
  Stack,
  Text,
  VStack,
} from 'native-base';
import {CountryCode} from '../../constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PublicRoutesType} from 'routes';
// import LinearGradient from 'react-native-linear-gradient';
// import auth from '@react-native-firebase/auth';
// import {useAppContext} from 'context';
import auth from '@react-native-firebase/auth';
import {useAppContext} from 'context';

type Props = NativeStackScreenProps<PublicRoutesType, 'Register'>;

const Register = ({navigation}: Props) => {
  const [phoneCode, setPhoneCode] = React.useState('+91');
  const [loader, setLoader] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [countryData, setCountryData] = useState<any>([]);
  const [countryLabel, setCountryLabel] = useState('IN');
  const [gender, setGender] = useState('male');
  const totalCountry = CountryCode;
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const {setConfirm} = useAppContext();

  const onSubmit = async (data: any) => {
    const registerData = {
      name: data?.Name,
      email: data?.Email,
      phone: data?.Number,
      gender: gender,
      password: data?.Password,
      countryCode: phoneCode,
      isRegister: true,
    };
    try {
      setLoader(true);
      const phoneNumber = `${phoneCode}${data.Number}`;
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      navigation.navigate('VerifyOtp', registerData);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoader(false);
    }
  };

  const onItemPress = (item: any) => {
    setPhoneCode(`+${item?.phone}`);
    setModalVisible(false);
    setCountryLabel(item?.code);
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        {/* {renderTopSection()} */}
        {/* <Center w={'full'} h={Dimensions.get('window').height * 0.4}>
          <LottieView source={registration} autoPlay loop={false} />
        </Center> */}
        <Box bg={COLORS.primary} height={250}></Box>
        <Box paddingX={5} bg={COLORS.textWhite} mt={-10} borderTopRadius={35}>
          <VStack mt={5}>
            <Heading
              color={COLORS.primary}
              fontSize={32}
              fontFamily="Nunito-Bold">
              Create Account
            </Heading>
            <Stack mt={1} space={2} w="100%">
              <FormControl isRequired isInvalid={'Name' in errors}>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      onBlur={onBlur}
                      onChangeText={val => onChange(val)}
                      value={value}
                      InputLeftElement={
                        <Box
                          borderRightWidth={1}
                          h="100%"
                          borderRightColor={COLORS.grey}>
                          <Icon
                            as={<Ionicons name="person-outline" />}
                            size={4}
                            ml="4"
                            mr={4}
                            mt="3"
                            color={COLORS.fadeBlack}
                          />
                        </Box>
                      }
                      placeholder="Enter Your Name"
                      fontSize={15}
                      borderRadius={5}
                      borderColor={COLORS.grey}
                      mt="2"
                    />
                  )}
                  name="Name"
                  rules={{
                    required: 'Name is required',
                    minLength: {value: 3, message: 'Min length is 3'},
                    maxLength: {value: 20, message: 'Max length is 20'},
                  }}
                  defaultValue=""
                />
                <FormControl.ErrorMessage mt={0}>
                  {errors.Name?.message}
                </FormControl.ErrorMessage>
              </FormControl>
              {/* Email input */}
              <FormControl isRequired isInvalid={'Email' in errors}>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      autoCapitalize="none"
                      onBlur={onBlur}
                      onChangeText={val => onChange(val)}
                      value={value}
                      borderWidth={1}
                      InputLeftElement={
                        <Box
                          borderRightWidth={1}
                          h="100%"
                          borderRightColor={COLORS.grey}>
                          <Icon
                            as={<FontAwesome name="envelope-o" />}
                            size={4}
                            ml="4"
                            mr={4}
                            mt="3"
                            color={COLORS.fadeBlack}
                          />
                        </Box>
                      }
                      placeholder="Enter Your Email"
                      borderRadius={5}
                      borderColor={COLORS.grey}
                      mt="2"
                      fontSize={15}
                    />
                  )}
                  name="Email"
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Email is invalid',
                    },
                  }}
                  defaultValue=""
                />
                <FormControl.ErrorMessage>
                  {errors.Email?.message}
                </FormControl.ErrorMessage>
              </FormControl>
              {/* Phone Number */}
              <FormControl isRequired isInvalid={'Number' in errors}>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      keyboardType="numeric"
                      onBlur={onBlur}
                      onChangeText={val => onChange(val)}
                      value={value}
                      InputLeftElement={
                        <Pressable
                          alignItems={'center'}
                          onPress={() => setModalVisible(true)}
                          borderRightWidth={1}
                          h="100%"
                          borderRightColor={COLORS.grey}>
                          {/* <Text ml="2" mr={4} mt="3" color={COLORS.fadeBlack}>
                            {phoneCode}
                          </Text> */}
                          <Image
                            ml="3"
                            mr={3}
                            mt="3"
                            alt="image"
                            source={{
                              uri: `https://flagcdn.com/w20/${countryLabel.toLowerCase()}.png`,
                            }}
                            style={{
                              width: 25,
                              height: 20,
                            }}
                            resizeMode="contain"
                          />
                        </Pressable>
                      }
                      placeholder="Enter Your Phone Number"
                      borderRadius={5}
                      borderColor={COLORS.grey}
                      mt="2"
                      fontSize={15}
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

              {/* Password */}
              <FormControl isRequired isInvalid={'Password' in errors}>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      onBlur={onBlur}
                      onChangeText={val => onChange(val)}
                      value={value}
                      InputLeftElement={
                        <Box
                          borderRightWidth={1}
                          h="100%"
                          borderRightColor={COLORS.grey}>
                          <Icon
                            as={<Ionicons name="key-outline" />}
                            size={4}
                            ml="4"
                            mr={4}
                            mt="3"
                            color={COLORS.fadeBlack}
                          />
                        </Box>
                      }
                      placeholder="Enter Your Passwword"
                      borderRadius={5}
                      borderColor={COLORS.grey}
                      mt="2"
                      fontSize={15}
                    />
                  )}
                  name="Password"
                  rules={{
                    required: 'Password is required',
                  }}
                  defaultValue=""
                />
                <FormControl.ErrorMessage>
                  {errors.Password?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <Heading size={'sm'}>Gender :</Heading>
              <Radio.Group
                value={gender}
                onChange={gen => setGender(gen)}
                defaultValue="male"
                size="lg"
                name="exampleGroup"
                accessibilityLabel="pick a choice">
                <Stack
                  direction={{
                    base: 'row',
                    md: 'row',
                  }}
                  alignItems={{
                    base: 'flex-start',
                    md: 'center',
                  }}
                  space={4}
                  w="75%"
                  maxW="300px">
                  <Radio
                    _text={{
                      mx: 2,
                    }}
                    colorScheme="green"
                    value="male"
                    icon={<Icon as={<Fontisto name="male" />} />}
                    my={1}>
                    Male
                  </Radio>
                  <Radio
                    _text={{
                      mx: 2,
                    }}
                    colorScheme="blue"
                    value="female"
                    icon={<Icon as={<Fontisto name="female" />} />}
                    my={1}>
                    Female
                  </Radio>
                </Stack>
              </Radio.Group>
              {loader ? (
                <HStack
                  space={2}
                  style={LoginStyles.signup}
                  justifyContent="center">
                  <Spinner accessibilityLabel="Loading posts" color={'white'} />
                  <Heading color="white" fontSize="md" mt={1}>
                    Sending OTP
                  </Heading>
                </HStack>
              ) : (
                <TouchableOpacity
                  style={LoginStyles.signup}
                  onPress={handleSubmit(onSubmit)}>
                  <Text style={styles.signupText}>Sign Up</Text>
                </TouchableOpacity>
              )}
            </Stack>
            <TouchableOpacity
              style={GlobalStyles.m_t_10}
              onPress={() => navigation.navigate('Login')}>
              <Heading
                mt={1}
                mb={2}
                textAlign={'center'}
                size={'sm'}
                color={'#133373'}
                fontFamily="Nunito-Bold"
                fontWeight={200}>
                Have an account? Sign In
              </Heading>
            </TouchableOpacity>
          </VStack>
        </Box>
        {/* modal start */}
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
                  style={styles.logoClose}
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
                    keyExtractor={(item: any) => item?.code}
                  />
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 50,
  },
  logo: {
    marginLeft: 2,
    marginRight: 2,
  },
  signupText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
  },
  code: {
    color: '#133373',
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
  },

  wrapper: {
    flex: 1,
  },
  centeredView: {
    backgroundColor: '#fff',
    minHeight: Dimensions.get('window').height,
  },
  modalView: {
    borderRadius: 10,
    paddingTop: 5,
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

  logoClose: {
    position: 'absolute',
    top: 5,
    right: 10,
    color: '#000',
  },
  iconMenu: {
    marginRight: 10,
  },
});
