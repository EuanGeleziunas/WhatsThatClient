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
      userId: '',
      firstName: '',
      lastName: '',
      email: '',
      photo: '',
      isLoading: true,
    };

    // this.onUnfriendButtonPress = this.onUnfriendButtonPress.bind(this);
  }

  componentDidMount() {
    this.setState({ userId: this.props.route.params.data.userId }, () => {
      this.getUserRequest();
      this.getProfilePhotoRequest();
    });
  }

  getUserRequest = async () => {
    try {
      const id = this.state.userId;
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

  getProfilePhotoRequest = async () => {
    try {
      const id = this.state.userId;
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

  deleteContactRequest = async () => {
    try {
      const id = this.state.userId;
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
      const id = this.state.userId;
      this.setState({ isLoading: true });
      const response = await fetch(`http://localhost:3333/api/1.0.0/user/${id}/block`, {
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
            <Text style={styles.subTitle}>Update Profile</Text>
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
            <BrandButton
              text={`Unfriend ${this.state.firstName}`}
              onPress={() =>
                this.props.navigation.navigate('Contacts', this.deleteContactRequest())
              }
            />
            <BrandButton
              text={`Block ${this.state.firstName}`}
              onPress={() => this.props.navigation.navigate('Contacts', this.blockContactRequest())}
            />
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
