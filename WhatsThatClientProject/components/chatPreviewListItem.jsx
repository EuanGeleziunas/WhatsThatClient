import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { brandStyles } from '../src/styles/brandStyles';

export default class ChatPreviewListItem extends React.Component {
  render() {
    const { chatName, timeStamp, lastMessage, lastMessageAuthor, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.chatPreviewContainer}>
          <View style={styles.topRowContainer}>
            <Text style={styles.chatName}>{chatName}</Text>
            {timeStamp !== null ? <Text style={styles.timeStamp}>{timeStamp}</Text> : null}
          </View>
          {lastMessage !== null ? (
            <View style={styles.bottomRowContainer}>
              <Text styles={styles.previewMessage}>{`${lastMessageAuthor}: ${lastMessage}`}</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.separator} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  chatPreviewContainer: {
    flexDirection: 'column',
  },
  topRowContainer: {
    flexDirection: 'row',
  },
  chatName: {},
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
