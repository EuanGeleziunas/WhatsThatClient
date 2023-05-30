/* eslint-disable arrow-body-style */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { brandStyles } from '../src/styles/brandStyles';
import ChatMessage from '../components/chatMessage';

export default class SingleChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatId: '',
      chatName: '',
      //   chatMembers: [],
      chatMessages: [],
      //   firstName: '',
      //   lastName: '',
      //   email: '',
      //   photo: '',
      //   isLoading: true,
      //   isContactAdded: false,
      //   isContactBlocked: false,
    };
  }

  componentDidMount() {
    this.setState({ chatId: this.props.route.params.data.chatId }, () => {
      this.getSingleChatRequest();
      console.log('ChatId from single chat screen', this.state.chatId);
    });
  }

  getSingleChatRequest = async () => {
    try {
      const id = this.state.chatId;
      const response = await fetch(`http://localhost:3333/api/1.0.0/chat/${id}`, {
        headers: {
          'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
        },
      });
      const json = await response.json();

      this.setState({
        chatName: json.name,
        // chatMembers: json.members,
        chatMessages: json.messages,
      });
    } catch (error) {
      this.setState({
        // error: 'Failed to fetch profile data.',
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.chatName}</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.chatMessages}
          renderItem={({ item }) => {
            return (
              <ChatMessage
                message={item.message}
                timeStamp={item.timestamp}
                messageAuthor={item.author.first_name}
                onPress={() => console.log('Message pressed')}
              />
            );
          }}
        />
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
});
