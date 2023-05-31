/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import BrandButton from '../components/brandButton';
import Contact from '../components/contact';
import ContactListItem from '../components/contactListItem';
import { brandStyles } from '../src/styles/brandStyles';

export default class ChatAddUserScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatId: '',
      contacts: [],
      error: '',
      isLoading: false,
      refresh: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({ chatId: this.props.route.params.data.chatId });
      this.getContactsRequest();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getContactsRequest = async () => {
    try {
      this.setState.isLoading = true;
      const response = await fetch('http://localhost:3333/api/1.0.0/contacts', {
        headers: {
          'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
        },
      });
      let json = null;

      if (response.status === 200) {
        json = await response.json();
      } else if (response.status === 401) {
        this.setState({ error: 'Unauthorised.' }, () => {});
      } else if (response.status === 500) {
        this.setState({ error: 'Something went wrong. Please try again.' }, () => {});
      }

      this.setState({
        contacts: json,
      });
    } finally {
      this.setState.isLoading = false;
      this.setState.refresh = !this.state.refresh;
      console.log(this.state.error);
    }
  };

  addUserRequest = async (userId) => {
    try {
      const { chatId } = this.state;

      const response = await fetch(
        `http://localhost:3333/api/1.0.0/chat/${chatId}/user/${userId}`,
        {
          method: 'POST',
          headers: {
            'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
          },
        },
      );

      if (response.status === 200) {
        // this.setState({ isFriend: false });
        this.props.navigation.navigate('ChatSettingsScreen');
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
    console.log('contact screen');
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>WhatsThat</Text>
            <Text style={styles.subTitle}>Add user to chat</Text>
          </View>
          {this.state.contacts === null || this.state.contacts.length === 0 ? (
            <View style={styles.noContactsContainer}>
              <Text style={styles.noContactsText}>You currently have no contacts.</Text>
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.contacts}
              renderItem={({ item }) => (
                <ContactListItem
                  userId={item.user_id}
                  firstName={item.first_name}
                  lastName={item.last_name}
                  addUserIcon
                  onAddUser={() => this.addUserRequest(item.user_id)}
                />
              )}
            />
          )}
        </View>
      );
    }
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
  buttonsContainer: {
    flexBasis: '15%',
    justifyContent: 'space-evenly',
  },
});
