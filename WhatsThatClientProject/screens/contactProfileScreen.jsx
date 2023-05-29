/* eslint-disable prefer-destructuring */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Image, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { brandStyles } from '../src/styles/brandStyles';
import BrandButton from '../components/brandButton';

export default class ContactProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contactId: '',
      firstName: '',
      lastName: '',
      email: '',
      photo: '',
      isLoading: true,
      isContactAdded: false,
      isContactBlocked: false,
    };
  }

  componentDidMount() {
    this.setState({ contactId: this.props.route.params.data.userId }, () => {
      this.getUserRequest();
      this.getProfilePhotoRequest();
      this.checkContactRelationship();
    });
  }

  getUserRequest = async () => {
    try {
      const id = this.state.contactId;
      const response = await fetch(`http://localhost:3333/api/1.0.0/user/${id}`, {
        headers: {
          'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
        },
      });
      const json = await response.json();

      this.setState({
        firstName: json.first_name,
        lastName: json.last_name,
        email: json.email,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        // error: 'Failed to fetch profile data.',
      });
    }
  };

  checkContactRelationship = async () => {
    const contactId = this.state.contactId;
    console.log('ContactId: ', contactId);
    try {
      this.setState.isLoading = true;
      const response = await fetch('http://localhost:3333/api/1.0.0/contacts', {
        headers: {
          'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
        },
      });
      let jsonContacts = null;

      if (response.status === 200) {
        jsonContacts = await response.json();

        this.setState({
          isContactAdded: jsonContacts.some((contact) => contact.user_id === contactId),
        });
        console.log('IsContactAdded', this.state.isContactAdded);
      } else if (response.status === 401) {
        // this.setState({ error: 'Unauthorised.' }, () => {});
      } else if (response.status === 500) {
        // this.setState({ error: 'Something went wrong. Please try again.' }, () => {});
      }
    } finally {
      // this.setState.isLoading = false;
      // this.setState.refresh = !this.state.refresh;
      // console.log(this.state.error);
    }

    try {
      this.setState.isLoading = true;
      const response = await fetch('http://localhost:3333/api/1.0.0/blocked', {
        headers: {
          'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
        },
      });
      let jsonBlockedUsers = null;

      if (response.status === 200) {
        jsonBlockedUsers = await response.json();
        console.log('json returned:', jsonBlockedUsers);

        this.setState({
          isContactBlocked: jsonBlockedUsers.some((contact) => contact.user_id === contactId),
        });
        console.log('IsContactBlocked', this.state.isContactBlocked);
      } else if (response.status === 401) {
        // this.setState({ error: 'Unauthorised.' }, () => {});
      } else if (response.status === 500) {
        // this.setState({ error: 'Something went wrong. Please try again.' }, () => {});
      }
    } finally {
      // this.setState.isLoading = false;
      // this.setState.refresh = !this.state.refresh;
      // console.log(this.state.error);
    }
  };

  getProfilePhotoRequest = async () => {
    try {
      const id = this.state.contactId;
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

  addContactRequest = async () => {
    try {
      const id = this.state.contactId;
      this.setState({ isLoading: true });
      const response = await fetch(`http://localhost:3333/api/1.0.0/user/${id}/contact`, {
        method: 'POST',
        headers: {
          'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
        },
      });

      if (response.status === 200) {
        // this.setState({ isBlocked: true });
        if (this.props.onClick) {
          this.props.onClick();
        }
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
      this.setState({ isLoading: false });
    }
  };

  deleteContactRequest = async () => {
    try {
      const id = this.state.contactId;
      const response = await fetch(`http://localhost:3333/api/1.0.0/user/${id}/contact`, {
        method: 'DELETE',
        headers: {
          'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
        },
      });

      if (response.status === 200) {
        // this.setState({ isFriend: false });
        if (this.props.onClick) {
          this.props.onClick();
        }
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
      this.setState({ isLoading: false });
    }
  };

  blockContactRequest = async () => {
    try {
      const id = this.state.contactId;
      this.setState({ isLoading: true });
      const response = await fetch(`http://localhost:3333/api/1.0.0/user/${id}/block`, {
        method: 'POST',
        headers: {
          'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
        },
      });
      console.log('Response', response);

      if (response.status === 200) {
        // this.setState({ isBlocked: true });
        if (this.props.onClick) {
          this.props.onClick();
        }
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
      this.setState({ isLoading: false });
    }
  };

  unblockContactRequest = async () => {
    try {
      const id = this.state.contactId;
      const response = await fetch(`http://localhost:3333/api/1.0.0/user/${id}/block`, {
        method: 'DELETE',
        headers: {
          'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
        },
      });

      if (response.status === 200) {
        // this.setState({ isFriend: false });
        if (this.props.onClick) {
          this.props.onClick();
        }
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
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>WhatsThat</Text>
            <Text style={styles.subTitle}>Contact Profile</Text>
          </View>

          <View style={styles.contentsContainer}>
            <View style={styles.profileImageContainer}>
              <Image
                style={styles.profileImage}
                source={{
                  uri: this.state.photo,
                }}
              />
            </View>

            <View style={styles.nameContainer}>
              <Text style={styles.name}>
                {this.state.firstName} {this.state.lastName}
              </Text>
              <Text style={styles.email}>{this.state.email}</Text>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            {this.state.isContactAdded ? (
              <BrandButton
                text={`Delete ${this.state.firstName}`}
                onPress={() =>
                  this.props.navigation.navigate('ContactsHomeScreen', this.deleteContactRequest())
                }
              />
            ) : (
              <BrandButton
                text={`Add ${this.state.firstName}`}
                onPress={() =>
                  this.props.navigation.navigate('ContactsHomeScreen', this.addContactRequest())
                }
              />
            )}
            {this.state.isContactBlocked ? (
              <BrandButton
                text={`Unblock ${this.state.firstName}`}
                onPress={() =>
                  this.props.navigation.navigate('BlockedListScreen', this.unblockContactRequest())
                }
              />
            ) : (
              <BrandButton
                text={`Block ${this.state.firstName}`}
                onPress={() =>
                  this.props.navigation.navigate('BlockedListScreen', this.blockContactRequest())
                }
              />
            )}
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: brandStyles.whiteSmoke,
    flex: 1,
    flexDirection: 'column',
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
  profileImageContainer: {
    display: 'flex',
  },
  profileImage: {
    alignSelf: 'center',
    borderRadius: 10,
    width: 200,
    height: 200,
  },
  nameContainer: {
    paddingVertical: 50,
    alignItems: 'center',
  },
  name: {
    color: brandStyles.orange,
    fontSize: 25,
  },
  email: {
    color: brandStyles.orange,
    fontSize: 18,
  },
  buttonsContainer: {
    display: 'flex',
    flexGrow: 0.5,
    justifyContent: 'space-evenly',
  },
});
