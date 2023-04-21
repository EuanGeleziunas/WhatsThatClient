import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BiErrorCircle } from 'react-icons/bi';
import { brandStyles } from '../src/styles/brandStyles';

class ErrorBox extends React.Component {
  render() {
    const { errorMessage } = this.props;
    return (
      <View style={styles.errorContainer}>
        <BiErrorCircle style={styles.errorIcon} />
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
});

export default ErrorBox;
