/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { brandStyles } from '../src/styles/brandStyles';

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: props.contact,
      isBlocked: props.isBlocked,
      isFriend: props.isFriend,
      isLoading: false,
      error: '',
    };

    console.log('props', this.props);
  }

  onUnBlockPressButton = async () => {
    if (this.checkLoggedIn()) {
      this.unBlockContactRequest();
    }
  };

  onBlockPressButton = async () => {
    if (this.checkLoggedIn()) {
      this.blockContactRequest();
    }
  };

  onUnFriendPressButton = async () => {
    if (this.checkLoggedIn()) {
      this.deleteContactRequest();
    }
  };

  onAddFriendPressButton = async () => {
    if (this.checkLoggedIn()) {
      this.addContactRequest();
    }
  };

  checkLoggedIn = async () => {
    const loginToken = await AsyncStorage.getItem('sessionAuthToken');
    if (loginToken == null) {
      this.props.navigation.navigate('Login');
    }
  };

  unBlockContactRequest = async () => {
    try {
      this.setState({ isLoading: true });
      const response = await fetch(
        `http://localhost:3333/api/1.0.0/user/${this.state.contact.user_id}/block`,
        {
          method: 'DELETE',
          headers: {
            'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
          },
        },
      );

      if (response.status === 200) {
        this.setState({ isBlocked: false });
        if (this.props.onClick) {
          this.props.onClick();
        }
      } else if (response.status === 400) {
        this.setState({ error: 'You can not block yourself.' });
      } else if (response.status === 401) {
        this.setState({ error: 'Unauthorised' });
      } else if (response.status === 404) {
        this.setState({ error: 'User not found.' });
      } else if (response.status === 500) {
        this.setState({ error: 'Something went wrong. Please try again.' });
      }
    } finally {
      this.setState({ isLoading: false });
    }
  };

  blockContactRequest = async () => {
    try {
      this.setState({ isLoading: true });
      const response = await fetch(
        `http://localhost:3333/api/1.0.0/user/${this.state.contact.user_id}/block`,
        {
          method: 'POST',
          headers: {
            'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
          },
        },
      );

      if (response.status === 200) {
        this.setState({ isBlocked: true });
        if (this.props.onClick) {
          this.props.onClick();
        }
      } else if (response.status === 400) {
        this.setState({ error: 'You can not block yourself.' });
      } else if (response.status === 401) {
        this.setState({ error: 'Unauthorised' });
      } else if (response.status === 404) {
        this.setState({ error: 'User not found.' });
      } else if (response.status === 500) {
        this.setState({ error: 'Something went wrong. Please try again.' });
      }
    } finally {
      this.setState({ isLoading: false });
    }
  };

  deleteContactRequest = async () => {
    try {
      this.setState({ isLoading: true });
      const response = await fetch(
        `http://localhost:3333/api/1.0.0/user/${this.state.contact.user_id}/contact`,
        {
          method: 'DELETE',
          headers: {
            'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
          },
        },
      );

      if (response.status === 200) {
        this.setState({ isFriend: false });
        if (this.props.onClick) {
          this.props.onClick();
        }
      } else if (response.status === 400) {
        this.setState({ error: 'You can not unFriend yourself.' });
      } else if (response.status === 401) {
        this.setState({ error: 'Unauthorised' });
      } else if (response.status === 404) {
        this.setState({ error: 'User not found.' });
      } else if (response.status === 500) {
        this.setState({ error: 'Something went wrong. Please try again.' });
      }
    } finally {
      this.setState({ isLoading: false });
    }
  };

  addContactRequest = async () => {
    try {
      this.setState({ isLoading: true });
      const response = await fetch(
        `http://localhost:3333/api/1.0.0/user/${this.state.contact.user_id}/contact`,
        {
          method: 'POST',
          headers: {
            'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
          },
        },
      );

      if (response.status === 200) {
        this.setState({ isFriend: true });
        if (this.props.onClick) {
          this.props.onClick();
        }
      } else if (response.status === 400) {
        this.setState({ error: 'You can add yourself.' });
      } else if (response.status === 401) {
        this.setState({ error: 'Unauthorised' });
      } else if (response.status === 404) {
        this.setState({ error: 'User not found.' });
      } else if (response.status === 500) {
        this.setState({ error: 'Something went wrong. Please try again.' });
      }
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.contact}>
          <Text>{this.state.error}</Text>
          <View style={styles.contactImage} />
          <Text style={styles.contactName}>
            {this.state.contact.first_name ?? this.state.contact.given_name}
          </Text>
          {this.state.isBlocked ? (
            <Button title="UnBlock" onPress={this.onUnBlockPressButton} />
          ) : (
            <Button title="Block" onPress={this.onBlockPressButton} />
          )}
          {this.state.isFriend ? (
            <Button title="UnFriend" onPress={this.onUnFriendPressButton} />
          ) : (
            <Button title="Add friend" onPress={this.onAddFriendPressButton} />
          )}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: brandStyles.red,
    backgroundColor: brandStyles.pink,
    paddingVertical: 10,
    paddingHorizontal: brandStyles.textInputPadding,
  },
  errorIcon: {
    color: brandStyles.red,
    fontSize: 16,
    textTransform: 'uppercase',
    marginRight: 5,
  },
  errorText: {
    color: brandStyles.red,
    fontSize: 16,
    textTransform: 'uppercase',
    marginLeft: 5,
  },
});
