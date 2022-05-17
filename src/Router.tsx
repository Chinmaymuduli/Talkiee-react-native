import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRouts';

const Router = () => {
  return (
    <>
      <PublicRoutes />
      {/* <PrivateRoutes /> */}
    </>
  );
};

export default Router;

const styles = StyleSheet.create({});
