/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { brandStyles } from './src/styles/brandStyles';

import SignUpScreen from './screens/signUpScreen';
import LoginScreen from './screens/loginScreen';
import ContactScreen from './screens/contactScreen';
import ChatScreen from './screens/chatScreen';
import UserProfileScreen from './screens/userProfileScreen';
import SettingsScreen from './screens/settingsScreen';
import UpdateProfileScreen from './screens/updateProfileScreen';
import AddContactScreen from './screens/addContactScreen';
import CameraScreen from './screens/cameraScreen';
import ContactProfileScreen from './screens/contactProfileScreen';
import BlockedListScreen from './screens/blockedListScreen';

const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ContactStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function MainAppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Contacts') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Chats') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: brandStyles.orange,
      }}
      initialRouteName="Profile"
    >
      <Tab.Screen name="Contacts" component={ContactStackNavigation} />
      <Tab.Screen name="Chats" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileStackNavigation} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function ContactStackNavigation() {
  return (
    <ContactStack.Navigator screenOptions={{ headerShown: false }}>
      <ContactStack.Screen name="Contacts" component={ContactScreen} />
      <ContactStack.Screen name="ContactProfileScreen" component={ContactProfileScreen} />
      <ContactStack.Screen name="AddContactScreen" component={AddContactScreen} />
      <ContactStack.Screen name="BlockedListScreen" component={BlockedListScreen} />
    </ContactStack.Navigator>
  );
}

function ProfileStackNavigation() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="UserProfile" component={UserProfileScreen} />
      <ProfileStack.Screen name="UpdateProfileScreen" component={UpdateProfileScreen} />
      <ProfileStack.Screen name="CameraFunc" component={CameraScreen} />
    </ProfileStack.Navigator>
  );
}

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="SignUp" component={SignUpScreen} />
          <AuthStack.Screen name="MainAppNavigation" component={MainAppNavigation} />
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  }
}
