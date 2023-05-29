/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import BrandButton from '../components/brandButton';
import Contact from '../components/contact';
import ContactListItem from '../components/contactListItem';
import { brandStyles } from '../src/styles/brandStyles';

export default class BlockedListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blockedUsers: [],
      error: '',
      isLoading: false,
      refresh: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      if (this.checkLoggedIn()) {
        this.getBlockedUsersRequest();
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

  getBlockedUsersRequest = async () => {
    try {
      this.setState.isLoading = true;
      const response = await fetch('http://localhost:3333/api/1.0.0/blocked', {
        headers: {
          'X-Authorization': await AsyncStorage.getItem('sessionAuthToken'),
        },
      });
      let json = null;

      if (response.status === 200) {
        json = await response.json();
      } else if (response.status === 401) {
        this.setState({ error: 'Unauthorised.' }, () => {});
      } else if (response.status === 500) {
        this.setState({ error: 'Something went wrong. Please try again.' }, () => {});
      }

      this.setState({
        blockedUsers: json,
      });
    } finally {
      this.setState.isLoading = false;
      this.setState.refresh = !this.state.refresh;
      console.log(this.state.error);
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
            <Text style={styles.subTitle}>Blocked Users</Text>
          </View>
          {console.log('Blocked users', this.state.blockedUsers)}
          {this.state.blockedUsers === null || this.state.blockedUsers.length === 0 ? (
            <View style={styles.noBlockedUsersContainer}>
              <Text style={styles.noBlockedUsersText}>You currently have no blocked users.</Text>
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
