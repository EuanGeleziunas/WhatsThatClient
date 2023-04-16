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
    // this.onPressButton = this.onPressButton.bind(this);
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
            <BrandButton text="Login" onPress={this.onPress} />
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
