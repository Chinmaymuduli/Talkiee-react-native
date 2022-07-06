import React, {useState, createContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {getArrFromSnap} from '@ashirbad/js-core';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useIsMounted} from 'hooks';

type ContextType = {
  isLoggedIn?: boolean;
  setIsLoggedIn?: any;
  confirm?: any;
  setConfirm?: any;
  user?: any;
  setUser?: any;
};

export const AppContext = createContext<ContextType>({});

const AppContextProvider: React.FC = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>({
    _id: '',
    name: '',
    email: '',
    isOnline: false,
    profileImage: '',
    coverImage: '',
    status: '',
    phone: '',
    gender: '',
  });
  const [confirm, setConfirm] = useState<any>();

  const toggleLogIn = () => setIsLoggedIn(pre => !pre);

  // console.log('object runnibg hfsfhfsfjsgjn');

  useEffect(() => {
    const fetchUserSelf = async () => {
      try {
        const token = await AsyncStorage.getItem('tokenId');

        const response = await fetch('https://talkieeapp.herokuapp.com/self', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        // console.log('object22', data);
        if (response.status !== 200) {
          setUser({
            _id: '',
            name: '',
            email: '',
            isOnline: false,
            profileImage: '',
            coverImage: '',
            status: '',
            phone: '',
            gender: '',
          });
          return;
        }
        setUser(data?.data);
        // setIsLoggedIn(true);
      } catch (error) {
        console.log(error);
        setUser({
          _id: '',
          name: '',
          email: '',
          isOnline: false,
          profileImage: '',
          coverImage: '',
          status: '',
          phone: '',
          gender: '',
        });
      }
    };
    fetchUserSelf();
    return () => {};
  }, []);
  const value = {
    isLoggedIn,
    user,
    setUser,
    setIsLoggedIn,
    confirm,
    setConfirm,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
