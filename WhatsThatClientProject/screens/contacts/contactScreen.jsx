/* eslint-disable react/no-unused-state */
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
import { getContactsRequest } from '../../dataAccess/contactsManagement/contactsManagementRequests';

export default class ContactScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      error: '',
      isLoading: false,
      refresh: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      if (this.checkLoggedIn()) {
        this.getContacts();
      }
    });

    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getContacts();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.focusListener();
  }

  checkLoggedIn = async () => {
    const loginToken = await AsyncStorage.getItem('sessionAuthToken');
    if (loginToken == null) {
      this.props.navigation.navigate('Login');
    }
  };

  getContacts = async () => {
    let contacts = [];
    try {
      this.setState.isLoading = true;
      const response = await getContactsRequest();
      console.log('Contacts new request: ', response);

      contacts = response.data;
    } catch (error) {
      this.setState({ error: error.toJSON() }, () => {});
      console.log('error json: ', error.toJSON());
    } finally {
      this.setState.isLoading = false;
      this.setState.refresh = !this.state.refresh;
    }
    this.setState({
      contacts,
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
            <Text style={styles.subTitle}>Contacts</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <BrandButton
              text="Add contact"
              onPress={() => this.props.navigation.navigate('AddContactScreen')}
            />
            <BrandButton
              text="Blocked users"
              onPress={() => this.props.navigation.navigate('BlockedListScreen')}
            />
          </View>
          {this.state.contacts === null || this.state.contacts.length === 0 ? (
            <View style={styles.noContactsContainer}>
              <Text style={styles.subTitle}>You currently have no contacts.</Text>
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.contacts}
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
