import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import CreateAccountScreen from './CreateAccountScreen';
import SetUpProfileScreen from './SetUpProfileScreen';

const Stack = createStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator headerMode = "none">
      <Stack.Screen name="LoginScreen" component={LoginScreen}/>
      <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen}/>
      <Stack.Screen name="SetUpProfileScreen" component={SetUpProfileScreen}/>
    </Stack.Navigator>
  );
}