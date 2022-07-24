import React, {useState, createContext, useEffect, useRef} from 'react';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';

import {useDbFetch} from 'hooks';
import {BASE_URL, GET_SELF, UPDATE_CONTACT} from '../configs/pathConfig';
import {io} from 'socket.io-client';

type ContextType = {
  isLoggedIn?: boolean;
  setIsLoggedIn?: any;
  confirm?: any;
  setConfirm?: any;
  user?: any;
  setUser?: any;
  deviceContact?: any;
  socketRef?: any;
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

  const [deviceContact, setDeviceContact] = useState<any>([]);

  const [confirm, setConfirm] = useState<any>();

  let {fetchData, loading} = useDbFetch();

  const socketRef = useRef<any>(io(BASE_URL));

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept to view your contacts',
      }).then(permission => {
        if (permission === 'granted') {
          Contacts.getAll()
            .then(contacts => {
              // work with contacts
              // console.log(contacts[6].phoneNumbers);
              let contact = contacts?.map((item: any) => {
                return {
                  name: item?.displayName,
                  phoneNumbers: item?.phoneNumbers?.map((data: any) => {
                    return data?.number?.trim();
                  }),
                };
              });
              // console.log(contact);
              setDeviceContact(contact);
            })
            .catch(e => {
              console.log(e);
            });
        }
      });
    }

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const fetchUserSelf = async () => {
      try {
        fetchData(
          {
            path: BASE_URL + GET_SELF,
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
          },
          (result, response) => {
            console.log('result', result);
            if (response?.status === 200) {
              setUser(result?.data);
            }
          },
        );
      } catch (error) {
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

    let mounted = true;

    if (mounted) {
      fetchUserSelf();
    }

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (!user?._id) {
        return;
      }
      console.log('running');

      socketRef?.current?.on('connect', () => {
        socketRef?.current.emit('user-online', user?._id);
      });
    }

    return () => {
      mounted = false;
    };
  }, [user?._id]);

  useEffect(() => {
    let mounted = true;

    // console.log(deviceContact);

    if (mounted) {
      if (!user?._id) {
        return;
      }

      let contactData: any[] = [];

      deviceContact?.forEach((contact: any) => {
        if (contact?.phoneNumbers?.length > 0) {
          contact.phoneNumbers?.map((item: any) => {
            contactData?.push({
              name: contact?.name,
              phoneNumber: item,
            });
          });
        }
      });

      let bodyData = {
        contacts: contactData,
        muted: [],
      };

      // console.log(contactData, 'data');

      fetchData(
        {
          method: 'POST',
          path: BASE_URL + UPDATE_CONTACT,
          body: JSON.stringify(bodyData),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
        (result, response) => {
          console.log(result);
        },
      );
    }
  }, [user?._id, deviceContact]);

  console.log(user?._id);

  const value = {
    isLoggedIn,
    user,
    setUser,
    setIsLoggedIn,
    confirm,
    setConfirm,
    deviceContact,
    socketRef,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
