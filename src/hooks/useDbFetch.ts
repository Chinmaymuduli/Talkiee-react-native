import React, {useCallback, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type OPTIONS = {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  isAlert?: boolean;
  body?: any;
  headers?: object;
};

const useDbFetch = () => {
  let [loading, setLoading] = useState<boolean>(false);
  let [error, setError] = useState<any>();

  let fetchData = useCallback(
    (
      {path, method, body, headers}: OPTIONS,
      callback: (result: any, response: any) => void,
    ) => {
      (async () => {
        try {
          setLoading(true);
          const token = await AsyncStorage.getItem('tokenId');

          let response = await fetch(path, {
            method: method,
            headers: {
              ...headers,
              Authorization: `Bearer ${token}`,
            },
            body: body ? body : undefined,
          });

          let data = await response.json();

          // console.log('response', data);

          setLoading(false);
          callback(data, response);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      })();
    },
    [],
  );

  return {
    fetchData,
    loading,
    error,
  };
};

export default useDbFetch;
