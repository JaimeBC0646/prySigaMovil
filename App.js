import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './views/Main'
import RegisterScreen from './views/Registro'; 
import LoginScreen from './views/Login';  
import SessionUser from './views/SesionUser';
import ExpedientesScreen from './views/Expedientes';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Registro" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SesionUser" component={SessionUser} options={{ headerShown: false }} />
        <Stack.Screen name="Expedientes" component={ExpedientesScreen} options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
