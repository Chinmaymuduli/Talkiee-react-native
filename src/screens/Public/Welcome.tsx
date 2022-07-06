import React, {useEffect, useRef, useState} from 'react';
import {Box, Center, Image, Pressable, Text, Heading} from 'native-base';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PublicRoutesType} from 'routes';
import {
  Animated,
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
  CHAT,
  GROUP,
  STATUS,
} from 'assets';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {Empty} from 'components/core';
import LottieView from 'lottie-react-native';
import {COLORS} from 'configs';
import Svg, {Circle, G} from 'react-native-svg';

type Props = NativeStackScreenProps<PublicRoutesType, 'Welcome'>;

const onBoardingData = [
  {
    id: 1,
    img: CHAT,
    title: 'Protect and Moderate Online Chatings',
  },
  {
    id: 2,
    img: GROUP,
    title: 'Group Chat and Meet New People',
  },
  {
    id: 3,
    img: STATUS,
    title: 'Share your beautiful memories',
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
    const size = 50;
    const strokeWidth = 3;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef<any>(null);
    const percentage = (currentPage + 1) * (100 / onBoardingData.length);
    const animation = (toValue: number) => {
      return Animated.timing(progressAnimation, {
        toValue,
        duration: 250,
        useNativeDriver: true,
      }).start();
    };

    useEffect(() => {
      animation(percentage);
    }, [percentage]);
    useEffect(() => {
      progressAnimation.addListener((value: {value: number}) => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;
        if (progressRef?.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      });
      return () => {
        progressAnimation.removeAllListeners();
      };
    }, []);
    return (
      <SafeAreaView>
        <Box style={styles.bottomContainer}>
          <Box
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 30,
            }}>
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
                      index == currentPage ? COLORS.cyan : '#0056d6' + '20',
                    marginRight: 8,
                  }}
                />
              ))
            }
          </Box>

          <Box
            mt={9}
            mb={4}
            flex={1}
            justifyContent={'center'}
            alignItems={'center'}>
            <Svg width={size} height={size}>
              <G rotation="-90" origin={center}>
                <Circle
                  cx={center}
                  cy={center}
                  r={radius}
                  strokeWidth={strokeWidth}
                />
                <Circle
                  ref={progressRef}
                  stroke={COLORS.cyan}
                  cx={center}
                  cy={center}
                  r={radius}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                />
              </G>
            </Svg>
            <Pressable
              alignItems={'center'}
              justifyContent={'center'}
              bg={COLORS.cyan}
              borderRadius={40}
              p={2}
              position={'absolute'}>
              {currentPage != onBoardingData.length - 1 ? (
                <Box>
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color={COLORS.textWhite}
                    onPress={handleNext}
                  />
                </Box>
              ) : (
                <Box>
                  <Ionicons
                    name="checkmark"
                    size={24}
                    color={COLORS.textWhite}
                    onPress={() => navigation.navigate('Login')}
                  />
                </Box>
              )}
            </Pressable>
          </Box>
        </Box>
      </SafeAreaView>
    );
  };
  const renderTopSection = () => {
    return (
      <SafeAreaView>
        <Box style={styles.topHeader}>
          <Box style={styles.topHeader}>
            <Pressable onPress={handleSkipToEnd}>
              <Text
                py={1.5}
                px={2}
                bold
                fontWeight={500}
                color={COLORS.fadeBlack}
                style={{
                  fontSize: 15,
                  opacity: currentPage == onBoardingData.length - 1 ? 0 : 1,
                }}>
                Skip
              </Text>
            </Pressable>
          </Box>
        </Box>
      </SafeAreaView>
    );
  };

  const renderFlatListItem = ({item}: any) => {
    return (
      <Box style={styles.midContainer}>
        <Center h={400}>
          <Box h={400} w={'full'}>
            <LottieView source={item?.img} autoPlay loop />
          </Box>
        </Center>
        <Box alignItems={'center'} mt={3}>
          <Text fontFamily={'Nunito-Bold'} fontSize={17} color={COLORS.cyan}>
            {item?.title}
          </Text>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
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
  );
};

export default Welcome;

const styles = StyleSheet.create({
  bottomContainer: {
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
    justifyContent: 'flex-end',
    paddingHorizontal: 12,

    paddingTop: 20,
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
