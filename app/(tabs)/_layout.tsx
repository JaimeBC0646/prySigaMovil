import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function WorkspacesLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="SesionUser" />
        <Stack.Screen name="Expedientes" />
        <Stack.Screen name="Registro" />
      </Stack>
    </GestureHandlerRootView>
  );
}