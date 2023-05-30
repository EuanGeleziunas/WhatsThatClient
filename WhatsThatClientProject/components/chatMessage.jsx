import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { brandStyles } from '../src/styles/brandStyles';

export default class ChatMessage extends React.Component {
  render() {
    const { message, timeStamp, messageAuthor, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.chatMessageContainer}>
          <View style={styles.topRowContainer}>
            <Text style={styles.messageAuthor}>{messageAuthor}</Text>
            <Text style={styles.timeStamp}>{timeStamp}</Text>
          </View>
          <View style={styles.bottomRowContainer}>
            <Text style={styles.message}>{message}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  chatMessageContainer: {
    flexDirection: 'column',
    backgroundColor: brandStyles.orange,
  },
  topRowContainer: {
    flexDirection: 'row',
  },
  messageAuthor: {},
  timeStamp: {},
  bottomRowContainer: {},
  message: {},
});
