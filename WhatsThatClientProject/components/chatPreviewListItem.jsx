import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { brandStyles } from '../src/styles/brandStyles';

export default class ContactListItem extends React.Component {
  render() {
    const { chatName, timeStamp, lastMessage, lastMessageAuthor, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.chatPreviewContainer}>
          <View style={styles.topRowContainer}>
            <Text style={styles.chatName}>{chatName}</Text>
            <Text style={styles.timeStamp}>{timeStamp}</Text>
          </View>
          <View style={styles.bottomRowContainer}>
            <Text styles={styles.previewMessage}>{`${lastMessageAuthor}: ${lastMessage}`}</Text>
          </View>
        </View>
        <View style={styles.separator} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  chatPreviewContainer: {
    flexDirection: 'row',
  },
  topRowContainer: {},
  chatName: {},
  timeStamp: {},
  bottomRowContainer: {},
  previewMessage: {},
  separator: {
    borderBottomColor: brandStyles.lightOrange,
    borderBottomWidth: 2,
    marginVertical: 5,
  },
});
