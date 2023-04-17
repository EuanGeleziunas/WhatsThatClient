import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BiErrorCircle } from 'react-icons/bi';
import { brandStyles } from '../src/styles/brandStyles';
import BrandButton from './brandButton';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      submitted: false,
    };
    this.onPressButton = this.onPressButton.bind(this);
  }

  onPressButton() {
    console.log('Button is clicked');
    this.setState({ submitted: true });
    this.setState({ error: '' });

    console.log('State before validation', this.state);

    if (this.isFormValid()) {
      this.loginRequest();
    }
  }

  isFormValid() {
    if (!(this.state.email && this.state.password)) {
      console.log('state before setting error', this.state);
      this.setState({ error: 'Must enter an email and password' }, () => {});
      console.log('state after setting error', this.state);
      return false;
    } else {
      return true;
    }
  }

  loginRequest = async () => {
    const requestBody = {
      email: this.state.email,
      password: this.state.password,
    };

    return fetch('http://localhost:3333/api/1.0.0/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          this.setState(
            {
              error:
                'Email and password combination are not linked to an account',
            },
            () => {}
          );
          throw response;
        } else {
          this.setState(
            { error: 'Something went wrong. Please try again' },
            () => {}
          );
          throw response;
        }
      })
      .then(async (responseJson) => {
        console.log(responseJson);
        try {
          await AsyncStorage.setItem('id', responseJson.id);
          await AsyncStorage.setItem('token', responseJson.token);

          this.setState({ submitted: false });
          this.props.navigation.navigate('Home');
        } catch {
          throw 'Something went wrong';
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const navigation = this.props.navigation;
    const error = this.state.error;
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>WhatsThat</Text>
          <Text style={styles.subTitle}>Login</Text>
        </View>
        <View style={styles.loginContainer}>
          {error ? (
            <View style={styles.errorContainer}>
              <BiErrorCircle style={styles.errorIcon} />
              <Text style={styles.errorText}>{this.state.error}</Text>
            </View>
          ) : null}
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
              secureTextEntry
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
