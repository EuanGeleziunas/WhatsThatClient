/* eslint-disable react/destructuring-assignment */
// import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
// import BrandButton from '../components/brandButton';
// import Contact from '../components/contact';
// import ContactListItem from '../components/contactListItem';
// import { brandStyles } from '../src/styles/brandStyles';

export default class MessageOptionsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageId: '',
      message: '',
    };
  }

  componentDidMount() {
    this.setState(
      {
        messageId: this.props.route.params.data.messageId,
        message: this.props.route.params.data.message,
      },
      () => {
        console.log('MEssageId from Message options screen', this.state.messageId);
        console.log('Message from Message options screen', this.state.message);
      },
    );
  }

  render() {
    return (
      <View>
        <Text>Message options screen</Text>
      </View>
    );
  }
}
