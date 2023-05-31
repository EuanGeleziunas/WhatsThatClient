/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { brandStyles } from '../src/styles/brandStyles';
// import ChatMessage from '../components/chatMessage';
import BrandButton from '../components/brandButton';
import ContactListItem from '../components/contactListItem';

export default class ChatSettingsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatId: '',
      chatName: '',
      chatMembers: [],
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
    this.setState(
      {
        originalData: this.props.route.params.data,
        chatId: this.props.route.params.data.chatId,
        chatName: this.props.route.params.data.chatName,
      },
      async () => {
        await this.getChatMembersRequest();
        console.log('ChatId from single chat screen', this.state.chatId);
        console.log('ChatName from single chat screen', this.state.chatName);
        console.log('Chat members: ', this.state.chatMembers);
      },
    );

    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getChatMembersRequest();
    });
  }

  componentWillUnmount() {
    // Clean up the listener when the component is unmounted
    this.focusListener();
  }

  getChatMembersRequest = async () => {
    try {
      const chatId = this.state.chatId;

      const response = await fetch(`http://localhost:3333/api/1.0.0/chat/${chatId}`, {
        headers: {
          'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
        },
      });
      let json = null;

      if (response.status === 200) {
        console.log('Raw response:', response);
        json = await response.json();
        this.setState({
          chatMembers: json.members,
        });
      } else if (response.status === 401) {
        // this.setState({ error: 'Unauthorised.' }, () => {});
      } else if (response.status === 500) {
        // this.setState({ error: 'Something went wrong. Please try again.' }, () => {});
      }

      console.log('Json response: ', json);
    } finally {
      // this.setState.isLoading = false;
      // this.setState.refresh = !this.state.refresh;
      // console.log(this.state.error);
    }
  };

  updateChatNameRequest = async () => {
    const data = {};

    if (this.state.chatName !== this.state.originalData.chatName) {
      data['name'] = this.state.chatName;
    }

    const chatId = this.state.chatId;

    console.log('data', data);

    return fetch(`http://localhost:3333/api/1.0.0/chat/${chatId}`, {
      method: 'PATCH',
      headers: {
        'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Chat name updated');
          this.props.navigation.navigate('SingleChatScreen');
        } else {
          console.log('error');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  removeUserRequest = async (userId) => {
    try {
      const { chatId } = this.state;

      const response = await fetch(
        `http://localhost:3333/api/1.0.0/chat/${chatId}/user/${userId}`,
        {
          method: 'DELETE',
          headers: {
            'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
          },
        },
      );

      if (response.status === 200) {
        // this.setState({ isFriend: false });
        await this.getChatMembersRequest();
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
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>WhatsThat</Text>
          <Text style={styles.subTitle}>Chat Settings</Text>
        </View>
        <View style={styles.modifyChatNameContainer}>
          <View style={styles.formItem}>
            <TextInput
              value={this.state.chatName}
              onChangeText={(text) => this.setState({ chatName: text })}
              style={styles.formInput}
            />
          </View>
        </View>
        <View style={styles.updateChatNameButtonContainer}>
          <BrandButton text="Update Chat Name" onPress={this.updateChatNameRequest} />
        </View>
        <View style={styles.addUserButtonContainer}>
          <BrandButton
            text="Add User"
            onPress={() =>
              this.props.navigation.navigate('ChatAddUserScreen', {
                data: {
                  chatId: this.state.chatId,
                },
              })
            }
          />
        </View>
        <View style={styles.chatMembersContainer}>
          <Text style={styles.subTitle}>Chat Members</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.chatMembers}
            renderItem={({ item }) => (
              <ContactListItem
                chatId={this.state.chatId}
                userId={item.user_id}
                firstName={item.first_name}
                lastName={item.last_name}
                removeUserIcon
                onRemoveUser={() => this.removeUserRequest(item.user_id)}
              />
            )}
          />
        </View>
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
  modifyMessageContainer: {
    width: '100%',
  },
  formItem: {
    width: '100%',
    marginBottom: 20,
  },
  formInput: {
    height: 40,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#E8E8E8',
    color: '#696969',
    paddingLeft: brandStyles.textInputPadding,
  },
  updateChatNameButtonContainer: {
    marginBottom: 40,
  },
  addUserButtonContainer: {
    marginBottom: 20,
  },
  removeUserButtonContainer: {
    marginBottom: 20,
  },
});
