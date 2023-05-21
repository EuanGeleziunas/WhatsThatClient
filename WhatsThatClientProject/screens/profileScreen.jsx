/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import BrandButton from '../components/brandButton';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      // error: '',
      isLoading: true,
    };

    this.onLogoutPressButton = this.onLogoutPressButton.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      if (this.checkLoggedIn()) {
        this.getUserRequest();
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onLogoutPressButton() {
    this.logoutRequest();
  }

  getUserRequest = async () => {
    try {
      const id = await AsyncStorage.getItem('userId');
      const response = await fetch(`http://localhost:3333/api/1.0.0/user/${id}`, {
        headers: {
          'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
        },
      });
      const json = await response.json();

      this.setState({
        firstName: json.firstName,
        lastName: json.lastName,
        email: json.email,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        // error: 'Failed to fetch profile data.',
      });
    }
  };

  checkLoggedIn = async () => {
    const loginToken = await AsyncStorage.getItem('sessionAuthToken');
    if (loginToken == null) {
      this.props.navigation.navigate('Login');
    }
  };

  async logoutRequest() {
    return fetch('http://localhost:3333/api/1.0.0/logout', {
      method: 'POST',
      headers: {
        'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
      },
    })
      .then(async (response) => {
        if (response.status === 200) {
          await AsyncStorage.removeItem('userId');
          await AsyncStorage.removeItem('sessionAuthToken');
          this.props.navigation.navigate('Login');
        } else if (response.status === 401) {
          console.log('Unauthorised');
          await AsyncStorage.removeItem('userId');
          await AsyncStorage.removeItem('sessionAuthToken');
          this.props.navigation.navigate('Login');
        } else {
          throw response;
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View>
          <Text>Profile Screen</Text>
          <Text>
            FirstName:
            {this.state.firstName}
          </Text>
          <Text>
            LastName:
            {this.state.lastName}
          </Text>
          <Text>
            Email:
            {this.state.email}
          </Text>
          <BrandButton text="Logout" onPress={this.onLogoutPressButton} />
        </View>
      );
    }
  }
}
