import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { brandStyles } from '../src/styles/brandStyles';

export default class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
    this.getTimeStampFormat = this.getTimeStampFormat.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  getTimeStampFormat(rawTimeStamp) {
    const date = new Date(rawTimeStamp);
    return `${date.getDate()}/${date.getMonth() + 1} ${date.getHours()}:${date.getMinutes()}`;
  }

  render() {
    const { message, timeStamp, messageAuthor, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.chatMessageContainer}>
          <View style={styles.topRowContainer}>
            <Text style={styles.messageAuthor}>{messageAuthor}</Text>
            <Text style={styles.timeStamp}>{this.getTimeStampFormat(timeStamp)}</Text>
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
    alignSelf: 'flex-end',
    backgroundColor: brandStyles.orange,
    width: '75%',
    borderRadius: 8,
    padding: 5,
    marginBottom: 5,
    color: brandStyles.white,
  },
  topRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  messageAuthor: {
    color: brandStyles.white,
  },
  timeStamp: {
    color: brandStyles.whiteSmoke,
  },
  bottomRowContainer: {},
  message: {
    color: brandStyles.white,
  },
});
