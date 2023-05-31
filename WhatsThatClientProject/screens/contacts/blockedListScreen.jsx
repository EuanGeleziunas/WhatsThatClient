/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import BrandButton from '../../components/brandButton';
import Contact from '../../components/contact';
import ContactListItem from '../../components/contactListItem';
import { brandStyles } from '../../src/styles/brandStyles';
import { getBlockedUsersRequest } from '../../dataAccess/contactsManagement/contactsManagementRequests';

export default class BlockedListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blockedUsers: [],
      isLoading: false,
      refresh: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getBlockedUsers();
    });

    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getBlockedUsers();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.focusListener();
  }

  getBlockedUsers = async () => {
    let blockedUsers = [];
    try {
      this.setState.isLoading = true;
      const response = await getBlockedUsersRequest();
      console.log('Contacts new request: ', response);

      blockedUsers = response.data;
    } catch (error) {
      // this.setState({ error: error.toJSON() }, () => {});
      console.log('error json: ', error.toJSON());
    } finally {
      this.setState.isLoading = false;
      this.setState.refresh = !this.state.refresh;
    }
    this.setState({
      blockedUsers,
    });
  };

  render() {
    console.log('contact screen');
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>WhatsThat</Text>
            <Text style={styles.subTitle}>Blocked Users</Text>
          </View>
          {console.log('Blocked users', this.state.blockedUsers)}
          {this.state.blockedUsers === null || this.state.blockedUsers.length === 0 ? (
            <View style={styles.noBlockedUsersContainer}>
              <Text style={styles.subTitle}>You currently have no blocked users.</Text>
            </View>
          ) : (
            <FlatList
              data={this.state.blockedUsers}
              renderItem={({ item }) => (
                <ContactListItem
                  userId={item.user_id}
                  firstName={item.first_name}
                  lastName={item.last_name}
                  onPress={() =>
                    this.props.navigation.navigate('ContactProfileScreen', {
                      data: {
                        userId: item.user_id,
                      },
                    })
                  }
                />
              )}
            />
          )}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: brandStyles.whiteSmoke,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  titleContainer: {
    flexBasis: '15%',
    justifyContent: 'center',
  },
  title: {
    color: brandStyles.orange,
    fontSize: 25,
  },
  subTitle: {
    color: brandStyles.orange,
    fontSize: 18,
  },
  buttonsContainer: {
    flexBasis: '15%',
    justifyContent: 'space-evenly',
  },
});
