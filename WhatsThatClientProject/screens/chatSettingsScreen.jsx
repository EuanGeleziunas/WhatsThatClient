/* eslint-disable react/destructuring-assignment */
// import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { brandStyles } from '../src/styles/brandStyles';
// import ChatMessage from '../components/chatMessage';

export default class ChatSettingsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatId: '',
      //   chatName: '',
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
    this.setState({ chatId: this.props.route.params.data.chatId }, () => {
      this.getSingleChatRequest();
      console.log('ChatId from single chat screen', this.state.chatId);
    });
  }

  render() {
    return (
      <View>
        <Text>Chat Settings Screen</Text>
      </View>
    );
  }
}
