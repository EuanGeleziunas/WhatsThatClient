/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // firstName: '',
      // lastName: '',
      // email: '',
      // error: '',
      // isLoading: '',
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      if (this.checkLoggedIn()) {
        // this.getProfileData;
      }
    });

    // this.getData();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  checkLoggedIn = async () => {
    const loginToken = await AsyncStorage.getItem('sessionAuthToken');
    console.log('LoginToken', loginToken);
    if (loginToken == null) {
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    return (
      <View>
        <Text>Profile Screen</Text>
      </View>
    );
  }
}
