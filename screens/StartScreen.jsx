import React, { useEffect } from 'react';
import axios from 'axios';
import { Loading } from '../components/Loading';
import WebViewScreen from './WebViewScreen';
import Menu from './Menu';


const initialState = {
  loading: true,
  statusCode: 0,
};
export const StartScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(initialState);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://snibbercrindle1.com/');
      const status = parseInt(response.status);
      if (status) {
        setIsLoading((isLoading) => ({
          ...isLoading,
          loading: false,
          statusCode: status,
        }));
      }
    } catch (error) {
      setIsLoading((isLoading) => ({
        ...isLoading,
        loading: false,
      }));
      console.log('Error>>>> ', error);
    }
  };
  const getLoading = () => {
    return <Loading />;
  };
  const getWebView = () => {
    return <WebViewScreen />;
  };
  const getGame = () => {
    return <Menu />;
  };

  if (isLoading.loading) {
  return  getLoading();
  }
  if (isLoading.statusCode === 200) {
   return getWebView();
  } else {
   return getGame();
  }
};
