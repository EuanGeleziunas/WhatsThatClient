/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Image, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { brandStyles } from '../src/styles/brandStyles';
import BrandButton from '../components/brandButton';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      photo: '',
      // error: '',
      isLoading: true,
    };
    this.onLogoutPressButton = this.onLogoutPressButton.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      if (this.checkLoggedIn()) {
        this.getUserRequest();
        this.getProfilePhotoRequest();
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onLogoutPressButton() {
    this.logoutRequest();
  }

  getUserRequest = async () => {
    try {
      const id = await AsyncStorage.getItem('userId');
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
      const id = await AsyncStorage.getItem('userId');
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

  checkLoggedIn = async () => {
    const loginToken = await AsyncStorage.getItem('sessionAuthToken');
    if (loginToken == null) {
      this.props.navigation.navigate('Login');
    }
  };

  async logoutRequest() {
    return fetch('http://localhost:3333/api/1.0.0/logout', {
      method: 'POST',
      headers: {
        'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
      },
    })
      .then(async (response) => {
        if (response.status === 200) {
          await AsyncStorage.removeItem('userId');
          await AsyncStorage.removeItem('sessionAuthToken');
          this.props.navigation.navigate('Login');
        } else if (response.status === 401) {
          console.log('Unauthorised');
          await AsyncStorage.removeItem('userId');
          await AsyncStorage.removeItem('sessionAuthToken');
          this.props.navigation.navigate('Login');
        } else {
          throw response;
        }
      })
      .catch((error) => {
        throw error;
      });
  }

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
            <Text style={styles.subTitle}>Profile</Text>
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
              text="Update Profile"
              style={styles.updateProfileButton}
              onPress={() =>
                this.props.navigation.navigate('UpdateProfileScreen', {
                  data: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    photo: this.state.photo,
                  },
                })
              }
            />
            <BrandButton
              style={styles.logoutButton}
              text="Logout"
              onPress={this.onLogoutPressButton}
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
