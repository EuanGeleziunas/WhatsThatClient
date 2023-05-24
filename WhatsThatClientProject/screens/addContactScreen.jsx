/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import BrandButton from '../components/brandButton';

export default class AddContactScreen extends Component {
  render() {
    console.log('Add contacnt screen');
    return (
      <View>
        <Text>Add Contact Screen</Text>
        <BrandButton text="Logout" onPress={this.onLogoutPressButton} />
      </View>
    );
  }
}
