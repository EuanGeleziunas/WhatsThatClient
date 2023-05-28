/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { brandStyles } from '../src/styles/brandStyles';

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: props.contact,
      contactUserId: props.contact.user_id,
      isBlocked: props.isBlocked,
      isFriend: props.isFriend,
      isLoading: false,
      error: '',
    };

    console.log('props', this.props);
  }

  componentDidMount() {
    this.getProfilePhotoRequest();
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

  getProfilePhotoRequest = async () => {
    try {
      const id = this.state.contactUserId;
      fetch(`http://localhost:3333/api/1.0.0/user/${id}/photo`, {
        method: 'GET',
        headers: {
          'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
        },
      })
        .then((response) => response.blob())
        .then((responseBlob) => {
          const data = URL.createObjectURL(responseBlob);
          this.setState({
            photo: data,
            isLoading: false,
          });
        });
    } catch (error) {
      this.setState({
        // error: 'Failed to fetch profile data.',
      });
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
      console.log(this.state.error);
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
        <View style={styles.contactContainer}>
          <View style={styles.pictureContainer}>
            <Image
              source={{
                uri: this.state.photo,
              }}
              style={styles.picture}
            />
          </View>
          <View style={styles.fullNameContainer}>
            <Text style={styles.firstName}>{this.state.contact.first_name}</Text>
            <Text style={styles.lastName}>{this.state.contact.last_name}</Text>
          </View>
          <View style={styles.iconsContainer}>
            <View style={styles.unfriendContainer}>
              <TouchableOpacity>
                {this.state.isFriend ? (
                  <Ionicons
                    name="ios-person-remove-outline"
                    color={brandStyles.orange}
                    onPress={this.onUnFriendPressButton}
                    size="200%"
                  />
                ) : (
                  <Ionicons
                    name="ios-person-add-outline"
                    color={brandStyles.orange}
                    onPress={this.onAddFriendPressButton}
                    size="200%"
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.blockContainer}>
              <TouchableOpacity>
                {this.state.isBlocked ? (
                  <MaterialIcons
                    name="block"
                    color={brandStyles.orange}
                    onPress={this.onUnBlockPressButton}
                    size="200%"
                  />
                ) : (
                  <MaterialIcons
                    name="block"
                    color={brandStyles.orange}
                    onPress={this.onBlockPressButton}
                    size="200%"
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  contactContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  pictureContainer: {},
  picture: {
    borderRadius: 10,
    height: 75,
    width: 75,
  },
  fullNameContainer: {
    justifyContent: 'center',
    paddingLeft: 5,
    flex: 1.5,
  },
  firstName: {
    // Define your name text styles here
  },
  lastName: {
    // Define your name text styles here
  },
  iconsContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  unfriendContainer: {
    flex: 1,
    alignItems: 'center',
  },
  blockContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
