/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import BrandButton from '../components/brandButton';
import Contact from '../components/contact';

export default class ContactScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      error: '',
      isLoading: false,
      refresh: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      if (this.checkLoggedIn()) {
        this.getContactsRequest();
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  checkLoggedIn = async () => {
    const loginToken = await AsyncStorage.getItem('sessionAuthToken');
    if (loginToken == null) {
      this.props.navigation.navigate('Login');
    }
  };

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
        <View>
          <Text>Contact Screen</Text>
          <Text>{this.state.error}</Text>
          <BrandButton
            text="Add contact"
            onPress={() => this.props.navigation.navigate('AddContactScreen')}
          />
          <FlatList
            data={this.state.contacts}
            renderItem={({ item }) => (
              <Contact
                contact={item}
                isBlocked={false}
                isFriend
                onClick={this.getContactsRequest}
              />
            )}
          />
        </View>
      );
    }
  }
}
