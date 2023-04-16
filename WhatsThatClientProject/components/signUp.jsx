/* eslint-disable no-else-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-regex-literals */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unused-state */
/* eslint-disable import/named */
/* eslint-disable no-use-before-define */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { brandStyles } from '../src/styles/brandStyles';
import BrandButton from './brandButton';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      submitted: false,
    };

    this.onPressButton = this.onPressButton.bind(this);
  }

  onPressButton() {
    // this.setState({ submitted: true });
    // this.setState({ error: '' });

    // if (!(this.state.email && this.state.password)) {
    //   this.setState({ error: 'Must enter email and password' });
    // }

    // const emailValidator = require('email-validator');

    // if (!emailValidator.validate(this.state.email)) {
    //   this.setState({ error: 'Must enter valid email' });
    // }

    // const PASSWORD_REGEX = new RegExp(
    //   '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
    // );

    // if (!PASSWORD_REGEX.test(this.state.password)) {
    //   this.setState({ error: "Password isn't strong enough" });
    // }

    console.log('Button is clicked');

    const dataToSend = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };

    return fetch('http://localhost:3333/api/1.0.0/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 400) {
          console.log('Failed validation or incorrect request');
          throw response;
        } else {
          throw response;
        }
      })
      .then((responseJson) => {
        console.log('User created with ID: ', responseJson);
        this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        throw error;
      });
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>WhatsThat</Text>
          <Text style={styles.subTitle}>Sign Up</Text>
        </View>
        <View style={styles.signUpContainer}>
          <View style={styles.formItem}>
            <TextInput
              placeholder="Enter first name"
              onChangeText={(firstName) => this.setState({ firstName })}
              value={this.state.firstName}
              style={styles.formInput}
            />
          </View>

          <View style={styles.formItem}>
            <TextInput
              placeholder="Enter last name"
              onChangeText={(lastName) => this.setState({ lastName })}
              value={this.state.lastName}
              style={styles.formInput}
            />
          </View>

          <View style={styles.formItem}>
            <TextInput
              placeholder="Enter email"
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              style={styles.formInput}
            />
          </View>

          <View style={styles.formItem}>
            <TextInput
              placeholder="Enter password"
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              style={styles.formInput}
            />
          </View>

          <View style={styles.formItem}>
            <TextInput
              placeholder="Confirm password"
              onChangeText={(confirmPassword) =>
                this.setState({ confirmPassword })
              }
              value={this.state.confirmPassword}
              style={styles.formInput}
            />
          </View>

          <View style={styles.formItem}>
            <BrandButton text="Sign Up" onPress={this.onPressButton} />
            <View style={styles.signInRedirectContainer}>
              <Text style={styles.signInText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signInLink}> Sign in</Text>
              </TouchableOpacity>
            </View>
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
  signUpContainer: {
    flexBasis: '85%',
    width: '100%',
    justifyContent: 'space-around',
  },
  formItem: {
    width: '100%',
  },
  formLabel: {
    fontSize: 15,
    color: brandStyles.orange,
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
  signInRedirectContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
  },
  signInLink: {
    color: brandStyles.orange,
  },
});

export default SignUp;
