import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import emailValidator from 'email-validator';
import { brandStyles } from '../src/styles/brandStyles';
import BrandButton from '../components/brandButton';
import ErrorBox from '../components/errorBox';

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
    console.log('Button is clicked');

    this.setState({ submitted: true });
    this.setState({ error: '' });

    if (this.isFormValid()) {
      this.signUpRequest();
    } else {
      console.log('logging state after validating form', this.state);
    }
  }

  signUpRequest = async () => {
    const { firstName, lastName, email, password } = this.state;
    const requestBody = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    };
    const { navigation } = this.props;

    return fetch('http://localhost:3333/api/1.0.0/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        console.log('Response', response);
        if (response.status === 201) {
          return response.json();
        }
        if (response.status === 400) {
          this.setState({ error: 'Account with this email already exists' }, () => {});
        } else {
          this.setState({ error: 'Something went wrong. Please try again' }, () => {});
        }

        throw response;
      })
      .then((responseJson) => {
        console.log('User created with ID: ', responseJson);
        navigation.navigate('Login');
      })
      .catch((error) => {
        throw error;
      });
  };

  isFormValid() {
    const { firstName, lastName, email, password, confirmPassword } = this.state;
    console.log('state before checking all fields', this.state);

    const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      this.setState({ error: 'All fields required!' }, () => {
        console.log('state after checking all fields', this.state);
      });
      return false;
    } else if (!emailValidator.validate(email)) {
      this.setState({ error: 'Must enter a valid email' }, () => {});
      return false;
    } else if (!PASSWORD_REGEX.test(password)) {
      this.setState({ error: 'Password is not strong enough' }, () => {});
      return false;
    } else if (password !== confirmPassword) {
      this.setState({ error: 'Passwords do not match' }, () => {});
      return false;
    } else {
      console.log('Form Validation Passed', this.state);
      return true;
    }
  }

  render() {
    const { navigation } = this.props;
    const { firstName, lastName, email, password, confirmPassword, error } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>WhatsThat</Text>
          <Text style={styles.subTitle}>Sign Up</Text>
        </View>
        <View style={styles.signUpContainer}>
          {console.log('error', error)}
          {error ? <ErrorBox errorMessage={error} /> : null}
          <View style={styles.formItem}>
            <TextInput
              placeholder="Enter first name"
              onChangeText={(text) => this.setState({ firstName: text })}
              value={firstName}
              style={styles.formInput}
            />
          </View>
          <View style={styles.formItem}>
            <TextInput
              placeholder="Enter last name"
              onChangeText={(text) => this.setState({ lastName: text })}
              value={lastName}
              style={styles.formInput}
            />
          </View>
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
            <TextInput
              placeholder="Confirm password"
              onChangeText={(text) => this.setState({ confirmPassword: text })}
              value={confirmPassword}
              secureTextEntry
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
