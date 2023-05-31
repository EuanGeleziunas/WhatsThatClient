/* eslint-disable import/no-extraneous-dependencies */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export {
  userSignUpRequest,
  searchUsersRequest,
  uploadProfilePhotoRequest,
  getUserRequest,
  getProfilePhotoRequest,
  updateUserRequest,
  loginRequest,
  logoutRequest,
};

async function userSignUpRequest(firstName, lastName, email, password) {
  return axios.post('http://localhost:3333/api/1.0.0/user', {
    data: {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    },
  });
}

async function getUserRequest(userId) {
  return axios.get(`http://localhost:3333/api/1.0.0/user/${userId}`, {
    headers: {
      'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
    },
  });
}

async function updateUserRequest(userId, firstName, lastName, email, password) {
  return axios.patch(`http://localhost:3333/api/1.0.0/user/${userId}`, {
    headers: {
      'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
    },
    data: {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    },
  });
}

async function loginRequest(email, password) {
  return axios.post('http://localhost:3333/api/1.0.0/login', email, password, {});
}

async function logoutRequest() {
  return axios.post('http://localhost:3333/api/1.0.0/login', {
    headers: {
      'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
    },
  });
}

async function getProfilePhotoRequest(userId) {
  return axios.get(`http://localhost:3333/api/1.0.0/user/${userId}/photo`, {
    headers: {
      'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
    },
  });
}

async function uploadProfilePhotoRequest(data) {
  const userId = await AsyncStorage.getItem('userId');
  const res = await fetch(data.uri);
  const blob = await res.blob();

  return axios.post(`http://localhost:3333/api/1.0.0/user/${userId}/photo`, blob, {
    headers: {
      'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
      'Content-Type': 'image/png',
    },
  });
}

async function searchUsersRequest() {
  return axios.get('http://localhost:3333/api/1.0.0/search', {
    headers: {
      'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
    },
  });
}
