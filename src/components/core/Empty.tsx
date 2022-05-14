import React from 'react';
import {Center, Box, Heading, Button} from 'native-base';
import LottieView from 'lottie-react-native';

type EmptyTypes = {
  title: string;
  subtitle?: string;
  animation?: any;
  h?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
  noLoop?: boolean;
};

const Empty = ({
  title,
  animation,
  subtitle,
  action,
  h = 600,
  noLoop = false,
}: EmptyTypes) => {
  return (
    <>
      <Center h={h}>
        <Box h="2/3" w="full">
          {Boolean(animation) && (
            <LottieView source={animation} autoPlay loop={!noLoop} />
          )}
        </Box>
        <Heading lineHeight={'lg'} textAlign={'center'}>
          {title}
        </Heading>
        {Boolean(subtitle) && (
          <Heading lineHeight={'lg'} size="sm" color="gray.600">
            {subtitle}
          </Heading>
        )}
        {Boolean(action) && (
          <Button
            my="5"
            colorScheme="primary"
            onPress={() => action?.onPress()}>
            {action?.label}
          </Button>
        )}
      </Center>
    </>
  );
};

export default Empty;
