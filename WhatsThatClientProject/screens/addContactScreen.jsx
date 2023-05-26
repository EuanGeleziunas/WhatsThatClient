/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { ActivityIndicator, View, Text, FlatList } from 'react-native';
import BrandButton from '../components/brandButton';
import Contact from '../components/contact';

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

      // this.setState({
      //   users: json,
      // });

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
        <View>
          <Text>Contact Screen</Text>
          <Text>{this.state.error}</Text>
          <BrandButton
            text="Add contact"
            onPress={() => this.props.navigation.navigate('AddContactScreen')}
          />
          <FlatList
            data={this.state.users}
            renderItem={({ item }) => (
              <Contact contact={item} isBlocked={item.isBlocked} isFriend={item.isFriend} />
            )}
          />
        </View>
      );
    }
  }
}
