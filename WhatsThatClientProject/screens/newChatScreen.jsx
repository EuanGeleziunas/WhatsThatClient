/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/destructuring-assignment */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { brandStyles } from '../src/styles/brandStyles';
import BrandButton from '../components/brandButton';

export default class NewChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatName: '',
    };
  }

  newChatRequest = async () => {
    const requestBody = {
      name: this.state.chatName,
    };

    return fetch('http://localhost:3333/api/1.0.0/chat', {
      method: 'POST',
      headers: {
        'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        console.log('Response', response);
        if (response.status === 200) {
          return response.json();
        }
        if (response.status === 400) {
          // this.setState({ error: 'Account with this email already exists' }, () => {});
        } else {
          // this.setState({ error: 'Something went wrong. Please try again' }, () => {});
        }

        throw response;
      })
      .then((responseJson) => {
        console.log('User created with ID: ', responseJson);
        // navigation.navigate('Login');
      })
      .catch((error) => {
        throw error;
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>WhatsThat</Text>
          <Text style={styles.subTitle}>New Chat</Text>
        </View>
        <View style={styles.newChatContainer}>
          <View style={styles.formItem}>
            <TextInput
              placeholder="New chat name"
              onChangeText={(text) => this.setState({ chatName: text })}
              value={this.state.chatName}
              style={styles.formInput}
            />
          </View>
          <View style={styles.formItem}>
            <BrandButton
              text="Create new chat"
              onPress={() =>
                this.props.navigation.navigate('ChatsHomeScreen', this.newChatRequest())
              }
            />
          </View>
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
  signUpContainer: {
    flexBasis: '85%',
    width: '100%',
    justifyContent: 'space-around',
  },
  formItem: {
    width: '100%',
  },
  formLabel: {
    fontSize: 15,
    color: brandStyles.orange,
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
  signInRedirectContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
  },
  signInLink: {
    color: brandStyles.orange,
  },
});
