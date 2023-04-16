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
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { brandStyles } from '../src/styles/brandStyles';
import BrandButton from './brandButton';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
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

    return fetch('http://localhost:3333/api/1.0.0/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          console.log('Invalid email or password');
          throw response;
        } else {
          throw response;
        }
      })
      .then(async (responseJson) => {
        console.log(responseJson);
        await AsyncStorage.setItem('@session_token', responseJson.token);
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>WhatsThat</Text>
          <Text style={styles.subTitle}>Login</Text>
        </View>
        <View style={styles.loginContainer}>
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
            <BrandButton text="Login" onPress={this.onPressButton} />
            <View style={styles.signUpRedirectContainer}>
              <Text style={styles.signUpText}>Don&apos;t have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signUpLink}> Sign up</Text>
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
  loginContainer: {
    flexBasis: '30%',
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
  signUpRedirectContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
  },
  signUpLink: {
    color: brandStyles.orange,
  },
});

export default Login;
