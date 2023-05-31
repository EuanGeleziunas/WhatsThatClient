/* eslint-disable react/no-unused-state */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { brandStyles } from '../../src/styles/brandStyles';
import BrandButton from '../../components/brandButton';
import ContactListItem from '../../components/contactListItem';
import {
  getChatMembersRequest,
  updateChatNameRequest,
  removeUserRequest,
} from '../../dataAccess/chatManagement/chatManagementRequests';

export default class ChatSettingsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatId: '',
      chatName: '',
      chatMembers: [],
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
        await this.getChatMembers();
        console.log('ChatId from single chat screen', this.state.chatId);
        console.log('ChatName from single chat screen', this.state.chatName);
        console.log('Chat members: ', this.state.chatMembers);
      },
    );

    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getChatMembers();
    });
  }

  componentWillUnmount() {
    this.focusListener();
  }

  getChatMembers = async () => {
    let chatMembers = [];

    try {
      this.setState.isLoading = true;
      const response = await getChatMembersRequest(this.state.chatId);
      chatMembers = response.data.members;
    } catch (error) {
      if (error.status === 400) {
        this.setState({ error: 'Bad request.' }, () => {});
      } else if (error.status === 401) {
        this.setState({ error: 'Unauthorised.' }, () => {});
      } else if (error.status === 500) {
        this.setState({ error: 'Something went wrong. Please try again.' }, () => {});
      }
    } finally {
      this.setState.isLoading = false;
      this.setState.refresh = !this.state.refresh;
    }
    this.setState({
      chatMembers,
    });
    console.log('Chatmembers:::', chatMembers);
  };

  updateChatName = async () => {
    if (this.state.chatName === this.state.originalData.chatName) {
      this.props.navigation.navigate('SingleChatScreen');
      return;
    }

    try {
      await updateChatNameRequest(this.state.chatId, this.state.chatName);
    } catch (error) {
      if (error.status === 400) {
        this.setState({ error: 'Bad request.' }, () => {});
      } else if (error.status === 401) {
        this.setState({ error: 'Unauthorised.' }, () => {});
      } else if (error.status === 500) {
        this.setState({ error: 'Something went wrong. Please try again.' }, () => {});
      }
    } finally {
      this.setState.isLoading = false;
      this.setState.refresh = !this.state.refresh;
      this.props.navigation.navigate('SingleChatScreen');
    }
  };

  removeUser = async (userId) => {
    try {
      await removeUserRequest(userId, this.state.chatId);
    } catch (error) {
      if (error.status === 400) {
        this.setState({ error: 'Bad request.' }, () => {});
      } else if (error.status === 401) {
        this.setState({ error: 'Unauthorised.' }, () => {});
      } else if (error.status === 500) {
        this.setState({ error: 'Something went wrong. Please try again.' }, () => {});
      }
    } finally {
      this.setState.isLoading = false;
      this.setState.refresh = !this.state.refresh;
      this.props.navigation.navigate('SingleChatScreen');
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
          <BrandButton text="Update Chat Name" onPress={this.updateChatName} />
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
                onRemoveUser={() => this.removeUser(item.user_id)}
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
