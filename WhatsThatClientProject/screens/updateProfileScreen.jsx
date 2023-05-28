/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { brandStyles } from '../src/styles/brandStyles';
import BrandButton from '../components/brandButton';

export default class UpdateProfileScreen extends Component {
  constructor(props) {
    super(props);

    console.log('State at start of constructor', this.state);

    this.state = {
      originalData: {},
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      error: '',
      photo: '',
      isLoading: true,
    };
    this.onUpdatePressButton = this.onUpdatePressButton.bind(this);

    console.log('State at end of constructor', this.state);
  }

  componentDidMount() {
    this.setState(
      {
        originalData: this.props.route.params.data,
        firstName: this.props.route.params.data.firstName,
        lastName: this.props.route.params.data.lastName,
        email: this.props.route.params.data.email,
        photo: this.props.route.params.data.photo,
        password: '',
      },
      () => {
        console.log('Update profile state', this.state);
      },

      // this.setState.isLoading = false;
    );
  }

  // eslint-disable-next-line class-methods-use-this
  onUpdatePressButton() {
    this.updateUserRequest();
  }

  async updateUserRequest() {
    const data = {};

    if (this.state.firstName !== this.state.originalData.firstName) {
      data['first_name'] = this.state.firstName;
    }

    if (this.state.lastName !== this.state.originalData.lastName) {
      data['last_name'] = this.state.lastName;
    }

    if (this.state.email !== this.state.originalData.email) {
      data['email'] = this.state.email;
    }

    if (this.state.password !== '') {
      // ToDo Password Validation
      data['password'] = this.state.password;
    }

    const id = await AsyncStorage.getItem('userId');

    console.log('data', data);

    return fetch(`http://localhost:3333/api/1.0.0/user/${id}`, {
      method: 'PATCH',
      headers: {
        'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('User updated');
          this.props.navigation.navigate('Profile');
        } else {
          console.log('error');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <View>
    //       <ActivityIndicator />
    //     </View>
    //   );
    // } else {
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

          <View style={styles.updatePhotoContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('CameraFunc', {})}>
              <Text style={styles.updatePhotoText}>Update Profile Picture</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.formItem}>
              <TextInput
                value={this.state.firstName}
                onChangeText={(text) => this.setState({ firstName: text })}
                style={styles.formInput}
              />
            </View>

            <View style={styles.formItem}>
              <TextInput
                value={this.state.lastName}
                onChangeText={(text) => this.setState({ lastName: text })}
                style={styles.formInput}
              />
            </View>

            <View style={styles.formItem}>
              <TextInput
                value={this.state.email}
                onChangeText={(text) => this.setState({ email: text })}
                style={styles.formInput}
              />
            </View>

            <View style={styles.formItem}>
              <TextInput
                placeholder="Update password"
                value={this.state.password}
                onChangeText={(text) => this.setState({ password: text })}
                style={styles.formInput}
                secureTextEntry
              />
            </View>

            <View style={styles.formItem}>
              <TextInput
                placeholder="Confirm new password"
                secureTextEntry
                style={styles.formInput}
              />
            </View>

            <BrandButton text="Update Profile" onPress={this.onUpdatePressButton} />
          </View>
        </View>
      </View>
    );
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
  contentsContainer: {
    flexGrow: 1,
  },
  profileImageContainer: {
    display: 'flex',
  },
  profileImage: {
    alignSelf: 'center',
    width: 200,
    height: 200,
  },
  updatePhotoContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
  },
  updatePhotoText: {
    color: brandStyles.orange,
  },
  formContainer: {
    width: '100%',
    justifyContent: 'space-around',
    flexGrow: 1,
  },
  formItem: {
    width: '100%',
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
});
