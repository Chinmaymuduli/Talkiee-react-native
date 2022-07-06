import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRouts';
import useAppContext from './context/useAppcontext';

const Router = () => {
  const {isLoggedIn, user} = useAppContext();
  return (
    <>
      {/* <PublicRoutes /> */}
      {user?._id ? <PrivateRoutes /> : <PublicRoutes />}
    </>
  );
};

export default Router;

const styles = StyleSheet.create({});
