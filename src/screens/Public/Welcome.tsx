import React, {useEffect, useRef, useState} from 'react';
import {Box, Center, Image, Pressable, Text, Heading} from 'native-base';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PublicRoutesType} from 'routes';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  map,
  meet,
  slider3,
  SliderBg,
  Security,
  chattingAnimation,
  groupChat,
} from 'assets';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {Empty} from 'components/core';
import LottieView from 'lottie-react-native';

type Props = NativeStackScreenProps<PublicRoutesType, 'Welcome'>;

const onBoardingData = [
  {
    id: 1,
    img: map,
    title: 'Protect and Moderate Online Chatings',
  },
  {
    id: 2,
    img: meet,
    title: 'Group Chat and Meet New People',
  },
  {
    id: 3,
    img: slider3,
    title: 'Find Your Best Friends With Us',
  },
];

const Welcome = ({navigation}: Props) => {
  const flatlistRef = useRef<FlatList>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [viewableItems, setViewableItems] = useState<any>([]);
  const WINDOW_WIDTH = useWindowDimensions();
  const handleViewableItemsChanged = useRef(({viewableItems}: any) => {
    setViewableItems(viewableItems);
  });
  useEffect(() => {
    if (!viewableItems[0] || currentPage === viewableItems[0].index) return;
    setCurrentPage(viewableItems[0].index);
  }, [viewableItems]);
  //handle next
  const handleNext = () => {
    if (currentPage == onBoardingData.length - 1) return;

    flatlistRef.current?.scrollToIndex({
      animated: true,
      index: currentPage + 1,
    });
  };
  //handle back
  const handleBack = () => {
    if (currentPage == 0) return;
    flatlistRef.current?.scrollToIndex({
      animated: true,
      index: currentPage - 1,
    });
  };
  //skip to end
  const handleSkipToEnd = () => {
    flatlistRef.current?.scrollToIndex({
      animated: true,
      index: onBoardingData.length - 1,
    });
  };

  const renderBottomSection = () => {
    return (
      <SafeAreaView>
        <Box style={styles.bottomContainer}>
          <Box style={{flexDirection: 'row', alignItems: 'center'}}>
            {
              // No. of dots
              [...Array(onBoardingData.length)].map((_, index) => (
                <Box
                  key={index}
                  style={{
                    width: index == currentPage ? 20 : 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor:
                      index == currentPage ? '#0056d6' : '#0056d6' + '20',
                    marginRight: 8,
                  }}
                />
              ))
            }
          </Box>
          {currentPage != onBoardingData.length - 1 ? (
            <TouchableOpacity
              onPress={handleNext}
              style={styles.btnContainer}
              activeOpacity={0.8}>
              <AntDesignIcons
                name="right"
                style={{fontSize: 18, color: '#fff', opacity: 0.3}}
              />
              <AntDesignIcons
                name="right"
                style={{fontSize: 25, color: '#fff', marginLeft: -15}}
              />
            </TouchableOpacity>
          ) : (
            // Get Started Button
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}
              style={styles.getStartedBtn}>
              <Text
                fontFamily={'app_fonts'}
                fontWeight={100}
                style={{
                  fontFamily: 'Nunito-Bold',
                  color: '#fff',
                  fontSize: 16,
                  //   marginLeft: 10,
                  paddingHorizontal: 5,
                }}>
                Get Started
              </Text>
              {/* <AntDesignIcons
                name="right"
                style={{
                  fontSize: 18,
                  color: '#fff',
                  opacity: 0.3,
                  marginLeft: 10,
                }}
              />
              <AntDesignIcons
                name="right"
                style={{fontSize: 25, color: '#fff', marginLeft: -15}}
              /> */}
            </TouchableOpacity>
          )}
        </Box>
      </SafeAreaView>
    );
  };

  const renderTopSection = () => {
    return (
      <SafeAreaView>
        <Box style={styles.topHeader}>
          <Pressable onPress={handleBack}>
            <Ionicons
              name="chevron-back-outline"
              style={{
                fontSize: 25,
                color: '#0D70AE',
                opacity: currentPage == 0 ? 0 : 1,
              }}
            />
          </Pressable>
          {currentPage !== onBoardingData.length - 1 ? (
            <Pressable
              onPress={handleSkipToEnd}
              shadow={2}
              bg={'#fff'}
              borderWidth={1}
              borderColor={'#EBEBEB'}
              borderRadius={20}>
              <Text
                py={1.5}
                px={6}
                bold
                fontWeight={500}
                style={{
                  fontSize: 15,
                  color: '#0D70AE',
                  opacity: currentPage == onBoardingData.length - 1 ? 0 : 1,
                }}>
                Skip
              </Text>
            </Pressable>
          ) : null}
        </Box>
      </SafeAreaView>
    );
  };

  const renderFlatListItem = ({item}: any) => {
    return (
      <Box style={styles.midContainer}>
        <Box pl={7} w={'2/3'} h={110}>
          <Text fontFamily={'Nunito-Bold'} fontSize={24}>
            {item?.title}
          </Text>
        </Box>
        <Box alignItems={'center'}>
          <Image
            source={item?.img}
            alt={'image'}
            h={250}
            w={'100%'}
            resizeMode={'contain'}
          />
        </Box>
        <Box px={3}>
          <Text textAlign={'center'}>
            In publishing and graphic design, Lorem ipsumfinal copy is a
            placeholder text commonly used to demonstrate the visual form of a
            document or a typeface without relying on meaningful content. Lorem
            ipsum may be used as a placeholder before final copy is available.
          </Text>
        </Box>
      </Box>
    );
  };

  return (
    <ImageBackground source={SliderBg} style={{flex: 1}}>
      <Box
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        {renderTopSection()}
        <FlatList
          data={onBoardingData}
          renderItem={renderFlatListItem}
          keyExtractor={(item, index) => index.toString()}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={flatlistRef}
          initialNumToRender={1}
          extraData={WINDOW_WIDTH}
          onViewableItemsChanged={handleViewableItemsChanged.current}
          viewabilityConfig={{viewAreaCoveragePercentThreshold: 100}}
        />
        {renderBottomSection()}
      </Box>
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#0056d6',
  },
  getStartedBtn: {
    paddingHorizontal: 10,
    height: 45,
    borderRadius: 30,
    backgroundColor: '#0056d6',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginTop: 20,
    height: 50,
  },
  midContainer: {
    flex: 1,
    marginTop: 30,
    width: Dimensions.get('window').width,
  },

  animation: {
    width: '100%',
    height: 300,
    borderRadius: 25,
    backgroundColor: '#000',
  },
});
