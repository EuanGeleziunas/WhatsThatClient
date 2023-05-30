import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { brandStyles } from '../src/styles/brandStyles';

export default class ChatPreviewListItem extends React.Component {
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
    const { chatName, timeStamp, lastMessage, lastMessageAuthor, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.chatPreviewContainer}>
          <View style={styles.topRowContainer}>
            <Text style={styles.chatName}>{chatName}</Text>
            {timeStamp !== '' ? (
              <Text style={styles.timeStamp}>{this.getTimeStampFormat(timeStamp)}</Text>
            ) : null}
          </View>
          <View style={styles.bottomRowContainer}>
            {lastMessage !== '' ? (
              <Text style={styles.previewMessage}>{`${lastMessageAuthor}: ${lastMessage}`}</Text>
            ) : (
              <Text style={styles.previewMessage}>There are no messages in this chat.</Text>
            )}
          </View>
        </View>
        <View style={styles.separator} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  chatPreviewContainer: {
    flexDirection: 'column',
    height: 50,
    justifyContent: 'space-between',
  },
  topRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: brandStyles.orange,
  },
  timeStamp: {},
  bottomRowContainer: {
    flexDirection: 'row',
  },
  previewMessage: {},
  separator: {
    borderBottomColor: brandStyles.lightOrange,
    borderBottomWidth: 2,
    marginVertical: 5,
  },
});
