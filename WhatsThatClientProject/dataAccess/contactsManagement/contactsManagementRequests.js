/* eslint-disable import/no-extraneous-dependencies */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export { getContactsRequest, getBlockedUsersRequest };

async function getContactsRequest() {
  return axios.get('http://localhost:3333/api/1.0.0/contacts', {
    headers: {
      'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
    },
    data: {},
  });
}

async function getBlockedUsersRequest() {
  return axios.get('http://localhost:3333/api/1.0.0/blocked', {
    headers: {
      'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
    },
  });
}
