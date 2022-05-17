import {Alert, Dimensions, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import {
  ArrowForwardIcon,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Spinner,
  Text,
} from 'native-base';
import OTPTextInput from 'react-native-otp-textinput';
import {COLORS} from 'configs';
import {LoginStyles} from 'styles';
import LottieView from 'lottie-react-native';
import {success} from 'assets';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PublicRoutesType} from 'routes';
import {useAppContext} from 'context';
// import {useAppContext} from 'contexts';
// import database from '@react-native-firebase/database';
// import {RootRouteProp} from '../types/RouteType';
import auth from '@react-native-firebase/auth';
type Props = NativeStackScreenProps<PublicRoutesType, 'VerifyOtp'>;

const VerifyOtp = ({navigation, route}: Props) => {
  // console.log('route', route.params);
  let outInput = useRef(null);
  const [code, setCode] = React.useState('');
  const [loader, setLoader] = React.useState(false);
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const {confirm, setConfirm} = useAppContext();

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const ConfirmOtp = async () => {
    try {
      setLoader(true);
      await confirm?.confirm(code);
      // console.log('confirm');
      const token = await auth().currentUser?.getIdToken(true);

      // console.log('token', token);
      const userData = {
        name: route.params?.name,
        email: route.params?.email,
        phone: route.params?.number.trim(),
        gender: route.params?.gender,
        password: route.params?.password,
        countryCode: route.params?.countryCode,
        idToken: token,
      };
      //fetch request
      const response = await fetch('https://talkieeapp.herokuapp.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log('data', data);
      // !route.params?.login &&
      //   (await database().ref(`Users/${res?.user.uid}`).set(userData));

      // navigation.navigate('Home')
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  // Resend Otp
  const ResendOTP = async () => {
    try {
      const phoneNumber = `${route.params?.countryCode}${route.params?.number}`;
      const conformation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(conformation);
    } catch (error) {
      Alert.alert('Error', 'Too many requests sent. Please try again later.');
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.textWhite}}>
      <Center w={'full'} h={Dimensions.get('window').height * 0.2} mt={16}>
        <LottieView source={success} autoPlay loop={false} />
      </Center>
      <Text
        alignSelf={'center'}
        mt={8}
        fontFamily={'Nunito-Bold'}
        fontWeight={200}
        fontStyle="normal"
        fontSize={18}
        color={COLORS.textSecondary}>
        {/* Code sent to {route.params?.number} */}
        Code sent to 8520369741
      </Text>
      <Center mt={5}>
        <Flex flexDirection="row">
          <OTPTextInput
            ref={(e: MutableRefObject<null>) => (outInput = e)}
            inputCount={6}
            textInputStyle={LoginStyles.otpTextInput}
            tintColor={COLORS.primary}
            offTintColor={COLORS.whiteSmoke}
            handleTextChange={(text: any) => setCode(text)}
          />
        </Flex>
        <Box alignItems={'center'} mt={5}>
          <Text>{minutes + 'm' + ' ' + seconds + 's'}</Text>
          <Text fontSize={16} fontFamily={'Nunito-Bold'}>
            Didn't receive the code ?
          </Text>
          {minutes === 0 && seconds === 0 ? (
            <TouchableOpacity onPress={() => ResendOTP()}>
              <Text fontSize={18} bold color={COLORS.primary}>
                Request again
              </Text>
            </TouchableOpacity>
          ) : (
            <Text fontSize={18} color={COLORS.grey}>
              Request again
            </Text>
          )}
        </Box>
      </Center>
      <Box p={3}>
        {loader ? (
          <HStack
            space={2}
            style={LoginStyles.sendOtpButton}
            justifyContent="center">
            <Spinner accessibilityLabel="Loading posts" color={'white'} />
            <Heading color="white" fontSize="md" mt={1}>
              Verifying OTP
            </Heading>
          </HStack>
        ) : (
          <Button
            onPress={() => ConfirmOtp()}
            style={LoginStyles.sendOtpButton}
            fontSize={18}
            color={COLORS.textWhite}
            colorScheme="primary"
            endIcon={<ArrowForwardIcon size="5" color={COLORS.textWhite} />}>
            Verify and Continue
          </Button>
        )}
      </Box>
    </SafeAreaView>
  );
};

export default VerifyOtp;
