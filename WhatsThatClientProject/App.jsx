/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignUpScreen from './screens/signUpScreen';
import LoginScreen from './screens/loginScreen';
import ContactScreen from './screens/contactScreen';
import ChatScreen from './screens/chatScreen';
import ProfileScreen from './screens/profileScreen';
import SettingsScreen from './screens/settingsScreen';

const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainAppNavigation() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName="ProfileScreen">
      <Tab.Screen name="ContactScreen" component={ContactScreen} />
      <Tab.Screen name="ChatScreen" component={ChatScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="SignUp" component={SignUpScreen} />
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="MainAppNavigation" component={MainAppNavigation} />
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  }
}
