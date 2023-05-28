import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { brandStyles } from '../src/styles/brandStyles';

export default class ContactListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePictureUri: '',
    };
  }

  componentDidMount() {
    this.getProfilePhotoRequest();
  }

  getProfilePhotoRequest = async () => {
    try {
      const { userId } = this.props;
      fetch(`http://localhost:3333/api/1.0.0/user/${userId}/photo`, {
        method: 'GET',
        headers: {
          'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
        },
      })
        .then((response) => response.blob())
        .then((responseBlob) => {
          const profilePictureUri = URL.createObjectURL(responseBlob);
          this.setState({ profilePictureUri });
        });
    } catch (error) {
      this.setState({
        // error: 'Failed to fetch profile data.',
      });
    }
  };

  render() {
    const { firstName, lastName, onPress } = this.props;
    const { profilePictureUri } = this.state;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.contactContainer}>
          <View style={styles.pictureContainer}>
            <Image
              source={{
                uri: profilePictureUri,
              }}
              style={styles.picture}
            />
          </View>
          <View style={styles.fullNameContainer}>
            <Text style={styles.firstName}>{firstName}</Text>
            <Text style={styles.lastName}>{lastName}</Text>
          </View>
        </View>
        <View style={styles.separator} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  contactContainer: {
    flexDirection: 'row',
  },
  pictureContainer: {
    // flex: 1,
  },
  picture: {
    borderRadius: 10,
    height: 75,
    width: 75,
  },
  fullNameContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    paddingLeft: 10,
    // flex: 2,
  },
  firstName: {
    fontSize: 18,
  },
  lastName: {
    fontSize: 18,
  },
  separator: {
    borderBottomColor: brandStyles.lightOrange,
    borderBottomWidth: 2,
    marginVertical: 5,
  },
});
