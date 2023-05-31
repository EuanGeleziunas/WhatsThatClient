/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { brandStyles } from './src/styles/brandStyles';

import SignUpScreen from './screens/loginAndSignup/signUpScreen';
import LoginScreen from './screens/loginAndSignup/loginScreen';
import ContactScreen from './screens/contacts/contactScreen';
import UserProfileScreen from './screens/profile/userProfileScreen';
import UpdateProfileScreen from './screens/profile/updateProfileScreen';
import AddContactScreen from './screens/contacts/addContactScreen';
import CameraScreen from './screens/profile/cameraScreen';
import ContactProfileScreen from './screens/contacts/contactProfileScreen';
import BlockedListScreen from './screens/contacts/blockedListScreen';
import NewChatScreen from './screens/chats/newChatScreen';
import ChatHomeScreen from './screens/chats/chatHomeScreen';
import SingleChatScreen from './screens/chats/singleChatScreen';
import ChatSettingsScreen from './screens/chats/chatSettingsScreen';
import MessageOptionsScreen from './screens/chats/messageOptionsScreen';
import ChatAddUserScreen from './screens/chats/chatAddUserScreen';

const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ContactStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();
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
      <Tab.Screen name="Chats" component={ChatStackNavigation} />
      <Tab.Screen name="Profile" component={ProfileStackNavigation} />
    </Tab.Navigator>
  );
}

function ContactStackNavigation() {
  return (
    <ContactStack.Navigator screenOptions={{ headerShown: false }}>
      <ContactStack.Screen name="ContactsHomeScreen" component={ContactScreen} />
      <ContactStack.Screen name="ContactProfileScreen" component={ContactProfileScreen} />
      <ContactStack.Screen name="AddContactScreen" component={AddContactScreen} />
      <ContactStack.Screen name="BlockedListScreen" component={BlockedListScreen} />
    </ContactStack.Navigator>
  );
}

function ChatStackNavigation() {
  return (
    <ChatStack.Navigator screenOptions={{ headerShown: false }}>
      <ChatStack.Screen name="ChatsHomeScreen" component={ChatHomeScreen} />
      <ChatStack.Screen name="NewChatScreen" component={NewChatScreen} />
      <ChatStack.Screen name="SingleChatScreen" component={SingleChatScreen} />
      <ChatStack.Screen name="MessageOptionsScreen" component={MessageOptionsScreen} />
      <ChatStack.Screen name="ChatSettingsScreen" component={ChatSettingsScreen} />
      <ChatStack.Screen name="ChatAddUserScreen" component={ChatAddUserScreen} />
    </ChatStack.Navigator>
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
