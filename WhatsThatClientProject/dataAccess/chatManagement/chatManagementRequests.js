/* eslint-disable import/no-extraneous-dependencies */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export {
  updateMessageRequest,
  deleteMessageRequest,
  getChatsRequest,
  getChatMembersRequest,
  updateChatNameRequest,
  removeUserRequest,
  addUserRequest,
};

async function updateMessageRequest(chatId, messageId, message) {
  return axios.patch(
    `http://localhost:3333/api/1.0.0/chat/${chatId}/message/${messageId}`,
    { message },
    {
      headers: {
        'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
      },
    },
  );
}

async function deleteMessageRequest(chatId, messageId) {
  return axios.delete(`http://localhost:3333/api/1.0.0/chat/${chatId}/message/${messageId}`, {
    headers: {
      'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
    },
  });
}

async function getChatsRequest() {
  return axios.get('http://localhost:3333/api/1.0.0/chat', {
    headers: {
      'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
    },
  });
}

async function getChatMembersRequest(chatId) {
  return axios.get(`http://localhost:3333/api/1.0.0/chat/${chatId}`, {
    headers: {
      'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
    },
  });
}

async function updateChatNameRequest(chatId, name) {
  return axios.patch(
    `http://localhost:3333/api/1.0.0/chat/${chatId}`,
    { name },
    {
      headers: {
        'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
      },
    },
  );
}

async function removeUserRequest(userId, chatId) {
  return axios.delete(`http://localhost:3333/api/1.0.0/chat/${chatId}/user/${userId}`, {
    headers: {
      'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
    },
  });
}

async function addUserRequest(userId, chatId) {
  return axios.post(`http://localhost:3333/api/1.0.0/chat/${chatId}/user/${userId}`, null, {
    headers: {
      'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
      'Content-Type': 'application/json',
    },
  });
}
