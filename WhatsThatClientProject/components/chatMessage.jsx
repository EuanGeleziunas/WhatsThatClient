/* eslint-disable eqeqeq */
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { brandStyles } from '../src/styles/brandStyles';

export default class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUserId: null };
    this.getTimeStampFormat = this.getTimeStampFormat.bind(this);
  }

  async componentDidMount() {
    const loggedInUserId = await AsyncStorage.getItem('userId');
    this.setState({ loggedInUserId });
  }

  // eslint-disable-next-line class-methods-use-this
  getTimeStampFormat(rawTimeStamp) {
    const date = new Date(rawTimeStamp);
    return `${date.getDate()}/${date.getMonth() + 1} ${date.getHours()}:${date.getMinutes()}`;
  }

  render() {
    const { message, timeStamp, authorId, messageAuthor, onPress } = this.props;
    const { loggedInUserId } = this.state;

    const authorIsCurrentUser = loggedInUserId && authorId == loggedInUserId;

    console.log('AuthorId: ', authorId);
    console.log('CurrentUser: ', loggedInUserId);
    console.log('authorIsNotCurrentUser: ', authorIsCurrentUser);

    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={[
            styles.chatMessageContainer,
            authorIsCurrentUser && styles.currentUserMessageContainer,
          ]}
        >
          <View style={styles.topRowContainer}>
            <Text
              style={[styles.messageAuthor, authorIsCurrentUser && styles.currentUserMessageAuthor]}
            >
              {messageAuthor}
            </Text>
            <Text style={[styles.timeStamp, authorIsCurrentUser && styles.currentUserTimeStamp]}>
              {this.getTimeStampFormat(timeStamp)}
            </Text>
          </View>
          <View style={styles.bottomRowContainer}>
            <Text style={[styles.message, authorIsCurrentUser && styles.currentUserMessage]}>
              {message}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  chatMessageContainer: {
    flexDirection: 'column',
    backgroundColor: brandStyles.white,

    alignSelf: 'flex-start',
    width: '75%',
    borderRadius: 8,
    padding: 5,
    marginBottom: 5,
  },
  currentUserMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: brandStyles.orange,
  },
  topRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  messageAuthor: {
    color: brandStyles.black,
  },
  currentUserMessageAuthor: {
    color: brandStyles.white,
  },
  timeStamp: {
    color: brandStyles.darkGray,
  },
  currentUserTimeStamp: {
    color: brandStyles.whiteSmoke,
  },
  bottomRowContainer: {},
  message: {
    color: brandStyles.black,
  },
  currentUserMessage: {
    color: brandStyles.white,
  },
});
