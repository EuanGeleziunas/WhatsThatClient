/* eslint-disable react/no-unused-state */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { ActivityIndicator, View, Text, FlatList, StyleSheet } from 'react-native';
import Contact from '../../components/contact';
import { brandStyles } from '../../src/styles/brandStyles';
import ContactListItem from '../../components/contactListItem';
import { searchUsersRequest } from '../../dataAccess/userManagement/userManagementRequests';

export default class AddContactScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      error: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      if (this.checkLoggedIn()) {
        this.searchUsers();
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  checkLoggedIn = async () => {
    const loginToken = await AsyncStorage.getItem('sessionAuthToken');
    if (loginToken == null) {
      this.props.navigation.navigate('Login');
    }
  };

  searchUsers = async () => {
    let users = [];
    let response;
    try {
      this.setState.isLoading = true;
      response = await searchUsersRequest();
      console.log('Contacts new request: ', response);

      users = response.data;
    } catch (error) {
      if (response.status === 400) {
        this.setState({ error: 'Bad request.' }, () => {});
      } else if (response.status === 401) {
        this.setState({ error: 'Unauthorised.' }, () => {});
      } else if (response.status === 500) {
        this.setState({ error: 'Something went wrong. Please try again.' }, () => {});
      }
    } finally {
      this.setState.isLoading = false;
      this.setState.refresh = !this.state.refresh;
    }
    this.setState({
      users,
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
            <Text style={styles.subTitle}>All Users</Text>
          </View>
          {console.log('Users passed', this.state.users)}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.users}
            renderItem={({ item }) => (
              <ContactListItem
                userId={item.user_id}
                firstName={item.given_name}
                lastName={item.family_name}
                includeAddAndBlockIcons
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
