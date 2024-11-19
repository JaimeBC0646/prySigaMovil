import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider } from './UserContext';

export default function WorkspacesLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
          <Stack.Screen name="index" />
          <Stack.Screen name="Login" />
          <Stack.Screen name="Registro" />
          <Stack.Screen name="RecuperarContra" />
          <Stack.Screen name="ActualizarContra" />
        </Stack>
      </UserProvider>
    </GestureHandlerRootView>
  );
}