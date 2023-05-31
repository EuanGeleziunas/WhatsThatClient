/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { brandStyles } from '../src/styles/brandStyles';
// import ChatMessage from '../components/chatMessage';
import BrandButton from '../components/brandButton';

export default class ChatSettingsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatId: '',
      chatName: '',
      //   //   chatMembers: [],
      //   chatMessages: [],
      //   newMessage: '',
      //   refreshKey: 0,
      //   //   firstName: '',
      //   //   lastName: '',
      //   //   email: '',
      //   //   photo: '',
      //   //   isLoading: true,
      //   //   isContactAdded: false,
      //   //   isContactBlocked: false,
    };
  }

  componentDidMount() {
    this.setState(
      {
        originalData: this.props.route.params.data,
        chatId: this.props.route.params.data.chatId,
        chatName: this.props.route.params.data.chatName,
      },
      () => {
        console.log('ChatId from single chat screen', this.state.chatId);
        console.log('ChatName from single chat screen', this.state.chatName);
        console.log();
      },
    );
  }

  updateChatNameRequest = async () => {
    const data = {};

    if (this.state.chatName !== this.state.originalData.chatName) {
      data['name'] = this.state.chatName;
    }

    const chatId = this.state.chatId;

    console.log('data', data);

    return fetch(`http://localhost:3333/api/1.0.0/chat/${chatId}`, {
      method: 'PATCH',
      headers: {
        'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Chat name updated');
          this.props.navigation.navigate('SingleChatScreen');
        } else {
          console.log('error');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>WhatsThat</Text>
          <Text style={styles.subTitle}>Chat Settings</Text>
        </View>
        <View style={styles.modifyChatNameContainer}>
          <View style={styles.formItem}>
            <TextInput
              value={this.state.chatName}
              onChangeText={(text) => this.setState({ chatName: text })}
              style={styles.formInput}
            />
          </View>
        </View>
        <View style={styles.updateChatNameButtonContainer}>
          <BrandButton text="Update Chat Name" onPress={this.updateChatNameRequest} />
        </View>
        <View style={styles.addUserButtonContainer}>
          <BrandButton text="Add User" onPress={this.addUserRequest} />
        </View>
        <View style={styles.removeUserButtonContainer}>
          <BrandButton text="Remove User" onPress={this.removeUserRequest} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: brandStyles.whiteSmoke,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  titleContainer: {
    flexBasis: '15%',
    justifyContent: 'center',
  },
  title: {
    color: brandStyles.orange,
    fontSize: 25,
  },
  subTitle: {
    color: brandStyles.orange,
    fontSize: 18,
  },
  modifyMessageContainer: {
    width: '100%',
  },
  formItem: {
    width: '100%',
    marginBottom: 20,
  },
  formInput: {
    height: 40,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#E8E8E8',
    color: '#696969',
    paddingLeft: brandStyles.textInputPadding,
  },
  updateChatNameButtonContainer: {
    marginBottom: 40,
  },
  addUserButtonContainer: {
    marginBottom: 20,
  },
});
