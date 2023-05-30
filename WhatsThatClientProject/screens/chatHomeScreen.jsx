/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { brandStyles } from '../src/styles/brandStyles';
import BrandButton from '../components/brandButton';
import ChatPreviewListItem from '../components/chatPreviewListItem';

export default class ChatHomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [],
      // error: '',
      // isLoading: false,
      // refresh: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      if (this.checkLoggedIn()) {
        this.getChatsRequest();
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

  getChatsRequest = async () => {
    try {
      this.setState.isLoading = true;
      const response = await fetch('http://localhost:3333/api/1.0.0/chat', {
        headers: {
          'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
        },
      });
      let json = null;

      if (response.status === 200) {
        json = await response.json();
        console.log('ResponseJson: ', json);
      } else if (response.status === 401) {
        this.setState({ error: 'Unauthorised.' }, () => {});
      } else if (response.status === 500) {
        this.setState({ error: 'Something went wrong. Please try again.' }, () => {});
      }

      this.setState({
        chats: json,
      });
      console.log('Chats: ', this.state.chats);
    } finally {
      this.setState.isLoading = false;
      this.setState.refresh = !this.state.refresh;
      console.log(this.state.error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>WhatsThat</Text>
          <Text style={styles.subTitle}>Chats</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <BrandButton
            text="New chat"
            onPress={() => this.props.navigation.navigate('NewChatScreen')}
          />
        </View>
        {this.state.chats === null || this.state.chats.length === 0 ? (
          <View style={styles.noChatsContainer}>
            <Text style={styles.noChatsText}>You currently have no chats.</Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.chats}
            renderItem={({ item }) => {
              let hasMessage = false;

              if (Object.keys(item.last_message).length > 0) {
                hasMessage = true;
              }

              console.log('HasMessageValue: ', hasMessage);

              return (
                <ChatPreviewListItem
                  chatName={item.name}
                  timeStamp={hasMessage ? item.last_message.timestamp : ''}
                  lastMessage={hasMessage ? item.last_message.message : ''}
                  lastMessageAuthor={hasMessage ? item.last_message.author.first_name : ''}
                  onPress={() =>
                    this.props.navigation.navigate('SingleChatScreen', {
                      data: {
                        chatId: item.chat_id,
                      },
                    })
                  }
                />
              );
            }}
          />
        )}
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
  buttonsContainer: {
    flexBasis: '15%',
    justifyContent: 'space-evenly',
  },
});
