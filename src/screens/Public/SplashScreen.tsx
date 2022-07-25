import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Box, Image, Progress} from 'native-base';
import {LOGO, SplashBg} from 'assets';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PublicRoutesType} from 'routes';

type Props = NativeStackScreenProps<PublicRoutesType, 'SplashScreen'>;
const SplashScreen = ({navigation}: Props) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (count < 100) {
        setTimeout(() => {
          setCount(count + 10);
        }, 100);
      } else {
        navigation.navigate('Welcome');
      }
    }

    return () => {
      mounted = false;
    };
  }, [count]);
  return (
    <ImageBackground
      source={SplashBg}
      style={{
        flex: 1,
      }}
      resizeMode="cover">
      <Box flex={1} justifyContent={'center'}>
        <Box>
          <Image
            h={100}
            w={'100%'}
            alt="logo"
            source={LOGO}
            resizeMode={'contain'}
          />
        </Box>
        <Box alignItems={'center'} mr={2}>
          <Box w={'60%'}>
            <Progress colorScheme="primary" value={count} />
          </Box>
        </Box>
      </Box>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
