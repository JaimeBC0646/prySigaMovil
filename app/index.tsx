import React from 'react';
import { Text, View, Button } from 'react-native';
import * as Sentry from '@sentry/react-native';
import MainScreen from './Main';

// Inicializar Sentry
Sentry.init({
  dsn: 'https://2ae093784983375bb00fc89c819ea6e2@o4508366743994368.ingest.us.sentry.io/4508366851604480', // Reemplaza con tu DSN proporcionado por Sentry
  tracesSampleRate: 1.0,
  debug: true,
});
export default function HomeScreen() {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error, resetError }) => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Ocurrió un error inesperado.</Text>
          <Text>{error.toString()}</Text>
          <Button title="Reintentar" onPress={resetError} />
        </View>
      )}
    >
      <MainScreen />
    </Sentry.ErrorBoundary>
  );
}
