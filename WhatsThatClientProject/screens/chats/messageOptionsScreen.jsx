/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { brandStyles } from '../../src/styles/brandStyles';
import BrandButton from '../../components/brandButton';

export default class MessageOptionsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      originalData: {},
      chatId: '',
      messageId: '',
      message: '',
    };
  }

  componentDidMount() {
    this.setState(
      {
        originalData: this.props.route.params.data,
        chatId: this.props.route.params.data.chatId,
        messageId: this.props.route.params.data.messageId,
        message: this.props.route.params.data.message,
      },
      () => {},
    );
  }

  updateMessageRequest = async () => {
    const data = {};

    if (this.state.message !== this.state.originalData.message) {
      data['message'] = this.state.message;
    }

    const chatId = this.state.chatId;
    const messageId = this.state.messageId;

    return fetch(`http://localhost:3333/api/1.0.0/chat/${chatId}/message/${messageId}`, {
      method: 'PATCH',
      headers: {
        'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          this.props.navigation.navigate('SingleChatScreen');
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  deleteMessageRequest = async () => {
    try {
      const chatId = this.state.chatId;
      const messageId = this.state.messageId;

      const response = await fetch(
        `http://localhost:3333/api/1.0.0/chat/${chatId}/message/${messageId}`,
        {
          method: 'DELETE',
          headers: {
            'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
          },
        },
      );

      if (response.status === 200) {
        // this.setState({ isFriend: false });
        this.props.navigation.navigate('SingleChatScreen');
      } else if (response.status === 400) {
        // this.setState({ error: 'You can not unFriend yourself.' });
      } else if (response.status === 401) {
        // this.setState({ error: 'Unauthorised' });
      } else if (response.status === 404) {
        // this.setState({ error: 'User not found.' });
      } else if (response.status === 500) {
        // this.setState({ error: 'Something went wrong. Please try again.' });
      }
    } finally {
      // this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>WhatsThat</Text>
          <Text style={styles.subTitle}>Update / Delete Message</Text>
        </View>
        <View style={styles.modifyMessageContainer}>
          <View style={styles.formItem}>
            <TextInput
              value={this.state.message}
              onChangeText={(text) => this.setState({ message: text })}
              style={styles.formInput}
            />
          </View>
        </View>
        <View style={styles.updateButtonContainer}>
          <BrandButton text="Update Message" onPress={this.updateMessageRequest} />
        </View>
        <View style={styles.deleteButtonContainer}>
          <BrandButton text="Delete Profile" onPress={this.deleteMessageRequest} />
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
  updateButtonContainer: {
    marginBottom: 40,
  },
  deleteButtonContainer: {},
});
