/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { ActivityIndicator, View, Text, FlatList, StyleSheet } from 'react-native';
// import BrandButton from '../components/brandButton';
import Contact from '../components/contact';
import { brandStyles } from '../src/styles/brandStyles';
import ContactListItem from '../components/contactListItem';

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
        this.searchUserRequest();
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

  getContactsRequest = async () => {
    try {
      this.setState.isLoading = true;
      const response = await fetch('http://localhost:3333/api/1.0.0/contacts', {
        headers: {
          'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
        },
      });
      let json = [];

      if (response.status === 200) {
        json = await response.json();
      } else if (response.status === 401) {
        this.setState({ error: 'Unauthorised.' }, () => {});
      } else if (response.status === 500) {
        this.setState({ error: 'Something went wrong. Please try again.' }, () => {});
      }
      console.log(this.state.error);
      return json;
    } finally {
      this.setState.isLoading = false;
    }
  };

  getBlockedUsersRequest = async () => {
    try {
      this.setState.isLoading = true;
      const response = await fetch('http://localhost:3333/api/1.0.0/blocked', {
        headers: {
          'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
        },
      });
      let json = [];

      if (response.status === 200) {
        json = await response.json();
      } else if (response.status === 401) {
        this.setState({ error: 'Unauthorised.' }, () => {});
      } else if (response.status === 500) {
        this.setState({ error: 'Something went wrong. Please try again.' }, () => {});
      }
      return json;
    } finally {
      this.setState.isLoading = false;
    }
  };

  searchUserRequest = async () => {
    try {
      this.setState.isLoading = true;
      const response = await fetch('http://localhost:3333/api/1.0.0/search', {
        headers: {
          'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
        },
      });
      let json = [];

      if (response.status === 200) {
        json = await response.json();
      } else if (response.status === 400) {
        this.setState({ error: 'Bad request.' }, () => {});
      } else if (response.status === 401) {
        this.setState({ error: 'Unauthorised.' }, () => {});
      } else if (response.status === 500) {
        this.setState({ error: 'Something went wrong. Please try again.' }, () => {});
      }

      const currentContacts = await this.getContactsRequest();
      const currentBlockedUsers = await this.getBlockedUsersRequest();

      const newUsers = json.map((u) => ({
        ...u,
        isBlocked: !!currentBlockedUsers.find((c) => c.user_id === u.user_id),
        isFriend: !!currentContacts.find((c) => c.user_id === u.user_id),
      }));
      this.setState({ users: newUsers });

      console.log('Users', newUsers);
      console.log('Blocked users', currentBlockedUsers);
      console.log('Current contacts', currentContacts);
    } finally {
      this.setState.isLoading = false;
    }
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
