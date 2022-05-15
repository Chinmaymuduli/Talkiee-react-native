import React, {useState, createContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {getArrFromSnap} from '@ashirbad/js-core';
// import {useIsMounted} from 'hooks';

type ContextType = {
  // isLoggedIn?: boolean;
  // toggleLogIn?: () => void;
  // user?: any;
  // sendPushNotification?: any;

  // setIsLoggedIn?: any;
  confirm?: any;
  setConfirm?: any;
  // userData?: any;
  // setUserData?: any;
  // cartData?: any;
  // setCartData?: any;
};

export const AppContext = createContext<ContextType>({});

const AppContextProvider: React.FC = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [confirm, setConfirm] = useState<any>();
  const [userData, setUserData] = useState<any>();
  const [cartData, setCartData] = useState<any>();
  // const {isMounted} = useIsMounted();
  const toggleLogIn = () => setIsLoggedIn(pre => !pre);
  // useEffect(() => {
  //   auth().onAuthStateChanged(currentUser => {
  //     if (currentUser) {
  //       database()
  //         .ref(`Users/${currentUser.uid}`)
  //         .on('value', snap => {
  //           setUser(snap.val());
  //           setIsLoggedIn(true);
  //         });
  //       database()
  //         .ref(`Cart/${currentUser.uid}`)
  //         .on('value', snap => {
  //           setCartData(getArrFromSnap(snap));
  //         });
  //     } else {
  //       setUser(null);
  //       setIsLoggedIn(false);
  //     }
  //   });
  //   return () => {};
  // }, []);
  const value = {
    // isLoggedIn,
    // toggleLogIn,
    // user,
    // cartData,
    // setCartData,
    // setIsLoggedIn,
    confirm,
    setConfirm,
    // userData,
    // setUserData,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
