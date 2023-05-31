/* eslint-disable arrow-body-style */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { brandStyles } from '../../src/styles/brandStyles';
import ChatMessage from '../../components/chatMessage';

export default class SingleChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatId: '',
      chatName: '',
      chatMessages: [],
      newMessage: '',
      refreshKey: 0,
    };
  }

  componentDidMount() {
    this.setState({ chatId: this.props.route.params.data.chatId }, () => {
      this.getSingleChatRequest();
      console.log('ChatId from single chat screen', this.state.chatId);
    });

    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getSingleChatRequest();
    });
  }

  componentWillUnmount() {
    this.focusListener();
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
        chatMessages: json.messages,
      });
      console.log(this.state.chatName);
    } catch (error) {
      this.setState({});
    }
  };

  postMessageRequest = async () => {
    try {
      const id = this.state.chatId;

      const requestBody = {
        message: this.state.newMessage,
      };

      const response = await fetch(`http://localhost:3333/api/1.0.0/chat/${id}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 200) {
        this.setState(
          (prevState) => ({
            newMessage: '',
            refreshKey: prevState.refreshKey + 1,
          }),
          () => {
            this.getSingleChatRequest();
          },
        );
      } else if (response.status === 400) {
        // this.setState({ error: 'You can not block yourself.' });
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
      <View style={styles.screenContainer}>
        <View style={styles.navigationContainer}>
          <Ionicons
            name="arrow-back"
            color={brandStyles.orange}
            onPress={() => this.props.navigation.navigate('ChatsHomeScreen')}
            size="200%"
            style={styles.backIcon}
          />
          <Text style={styles.chatNameText}>{this.state.chatName}</Text>
          <Ionicons
            name="settings-outline"
            color={brandStyles.orange}
            onPress={() =>
              this.props.navigation.navigate('ChatSettingsScreen', {
                data: {
                  chatId: this.state.chatId,
                  chatName: this.state.chatName,
                },
              })
            }
            size="200%"
            style={styles.settingsIcon}
          />
        </View>
        <View style={styles.chatWindowContainer}>
          <FlatList
            inverted
            showsVerticalScrollIndicator={false}
            data={this.state.chatMessages ? this.state.chatMessages : []}
            renderItem={({ item }) => {
              console.log('Item: ', item);
              return (
                <ChatMessage
                  message={item.message}
                  timeStamp={item.timestamp}
                  authorId={item.author.user_id}
                  messageAuthor={item.author.first_name}
                  onPress={() =>
                    this.props.navigation.navigate('MessageOptionsScreen', {
                      data: {
                        chatId: this.state.chatId,
                        messageId: item.message_id,
                        message: item.message,
                      },
                    })
                  }
                />
              );
            }}
          />
          <View style={styles.newMessageContainer}>
            <TextInput
              placeholder="Enter new message..."
              onChangeText={(text) => this.setState({ newMessage: text })}
              value={this.state.newMessage}
              style={styles.newMessageInput}
            />
            <Feather
              name="send"
              color={brandStyles.orange}
              onPress={this.postMessageRequest}
              size="125%"
              style={styles.sendMessageIcon}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  navigationContainer: {
    backgroundColor: brandStyles.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomColor: '#696969',
    borderBottomWidth: 1,
  },
  chatNameText: {
    fontSize: 18,
    color: brandStyles.orange,
  },
  chatWindowContainer: {
    flexDirection: 'column',
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  newMessageContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  newMessageInput: {
    flex: 1,
    backgroundColor: brandStyles.white,
    color: '#696969',
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
  },
  sendMessageIcon: {
    alignSelf: 'center',
  },
});
