/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import brandStyles from '../src/styles/brandStyles';

class BrandButton extends React.Component {
  render() {
    const { text, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: brandStyles.orange,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: brandStyles.white,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default BrandButton;
