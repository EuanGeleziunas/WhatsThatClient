/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
    const { firstName, lastName, addUserIcon, removeUserIcon, onPress } = this.props;
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
          {removeUserIcon && (
            <View style={styles.iconsContainer}>
              <View style={styles.removeIconContainer}>
                <TouchableOpacity>
                  <AntDesign
                    name="deleteuser"
                    color={brandStyles.orange}
                    onPress={this.props.onRemoveUser}
                    size="200%"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {addUserIcon && (
            <View style={styles.iconsContainer}>
              <View style={styles.addIconContainer}>
                <TouchableOpacity>
                  <AntDesign
                    name="adduser"
                    color={brandStyles.orange}
                    onPress={this.props.onAddUser}
                    size="200%"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
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
  iconsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  contactIconContainer: {
    alignItems: 'center',
  },
  blockIconContainer: {
    alignItems: 'center',
  },
  separator: {
    borderBottomColor: brandStyles.lightOrange,
    borderBottomWidth: 2,
    marginVertical: 5,
  },
});
