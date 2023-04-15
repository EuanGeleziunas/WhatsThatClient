/* eslint-disable no-use-before-define */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { brandStyles } from '../src/styles/brandStyles';
// import BrandButton from './brandButton';

class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Sign In Page</Text>
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
});

export default Login;
