import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { LogBox } from 'react-native';
import 'react-native-gesture-handler';
import AddChatScreen from './src/screens/AddChatScreen';
import ChatHomeScreen from './src/screens/ChatHomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import ConfirmScreen from './src/screens/ConfirmScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import SuccessScreen from './src/screens/SuccessScreen';

LogBox.ignoreAllLogs()

export default function App() {

  const Stack = createStackNavigator()

  const globalScreenOptions = {
    headerStyle: { backgroundColor: '#FA9884', elevation: 0 },
    headerTitleStyle: { color: '#FFF' },
    headerTintColor: '#FFF',
    headerTitleAlign: 'left',
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="ChatHome"
          component={ChatHomeScreen}
        />

        <Stack.Screen
          name="AddChat"
          component={AddChatScreen}
        />

        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            headerStyle: {
              backgroundColor: '#FA9884',
              elevation: 0
            }
          }}
        />

        <Stack.Screen
          name="Confirm"
          component={ConfirmScreen}
        />

        <Stack.Screen
          name="Success"
          component={SuccessScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

