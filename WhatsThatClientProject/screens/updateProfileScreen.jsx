/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default class UpdateProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      originalData: {},
      firstName: '',
      lastName: '',
      email: '',
      error: '',
      isLoading: true,
    };
    this.onUpdatePressButton = this.onUpdatePressButton.bind(this);
  }

  componentDidMount() {
    this.setState(
      {
        originalData: this.props.route.params.data,
        firstName: this.props.route.params.data.firstName,
        lastName: this.props.route.params.data.lastName,
        email: this.props.route.params.data.email,
        password: '',
      },
      () => {
        console.log('Update profile state', this.state);
      },
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
        } else {
          console.log('error');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View>
        <Text>Update Profile Screen</Text>

        <Text>First name:</Text>
        <TextInput
          value={this.state.firstName}
          onChangeText={(val) => this.setState({ firstName: val })}
        />

        <Text>Last name:</Text>
        <TextInput
          value={this.state.lastName}
          onChangeText={(val) => this.setState({ lastName: val })}
        />

        <Text>Email:</Text>
        <TextInput value={this.state.email} onChangeText={(val) => this.setState({ email: val })} />

        <Text>Password:</Text>
        <TextInput
          value={this.state.password}
          onChangeText={(val) => this.setState({ password: val })}
          secureTextEntry
        />
        <Button title="Update Profile" onPress={this.onUpdatePressButton} />
        <Button
          title="Update Photo"
          onPress={() => this.props.navigation.navigate('CameraComponent', {})}
        />
      </View>
    );
  }
}
