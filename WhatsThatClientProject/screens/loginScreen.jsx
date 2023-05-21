import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { brandStyles } from '../src/styles/brandStyles';
import BrandButton from '../components/brandButton';
import ErrorBox from '../components/errorBox';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      // submitted: false,
    };
    this.onPressButton = this.onPressButton.bind(this);
  }

  onPressButton() {
    // this.setState({ submitted: true });
    this.setState({ error: '' });

    if (this.isFormValid()) {
      this.loginRequest();
    }
  }

  loginRequest = async () => {
    const { email, password } = this.state;
    const requestBody = { email, password };
    const { navigation } = this.props;

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
        }
        if (response.status === 400) {
          this.setState(
            {
              error: 'Email and password combination are not linked to an account',
            },
            () => {},
          );
        } else {
          this.setState({ error: 'Something went wrong. Please try again' }, () => {});
        }

        throw response;
      })

      .then(async ({ id, token }) => {
        try {
          await AsyncStorage.setItem('userId', id);
          await AsyncStorage.setItem('sessionAuthToken', token);

          // this.setState({ submitted: false });
          navigation.navigate('MainAppNavigation');
        } catch (error) {
          throw new Error('Something went wrong');
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  isFormValid() {
    const { email, password } = this.state;
    if (!(email && password)) {
      this.setState({ error: 'Must enter an email and password' }, () => {});

      return false;
    }
    return true;
  }

  render() {
    const { navigation } = this.props;
    const { email, password, error } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>WhatsThat</Text>
          <Text style={styles.subTitle}>Login</Text>
        </View>
        <View style={styles.loginContainer}>
          {error ? <ErrorBox errorMessage={error} /> : null}
          <View style={styles.formItem}>
            <TextInput
              placeholder="Enter email"
              onChangeText={(text) => this.setState({ email: text })}
              value={email}
              style={styles.formInput}
            />
          </View>

          <View style={styles.formItem}>
            <TextInput
              placeholder="Enter password"
              onChangeText={(text) => this.setState({ password: text })}
              value={password}
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
