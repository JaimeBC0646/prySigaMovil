import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MainScreen from '../views/Main';

describe('MainScreen', () => {
  it('Renderización completa -> mensajes de bienvenida y botones', () => {
    const navigation = { navigate: jest.fn() };
    const { getByText, getByTestId } = render(<MainScreen navigation={navigation} />);

    // Verificar si el título de bienvenida está presente
    expect(getByText('BIENVENIDO')).toBeTruthy();
    expect(getByText('Por favor Identifíquese')).toBeTruthy();

    // Verificar si los botones de "Iniciar Sesión" y "Registrarse" están presentes
    expect(getByText('Iniciar Sesión')).toBeTruthy();
    expect(getByText('Registrarse')).toBeTruthy();

    // Simular la apertura del modal de ayuda
    const helpButton = getByText('?');
    fireEvent.press(helpButton);
    expect(getByText('BIENVENIDO A SIGA MOVIL')).toBeTruthy();
  });

  it('Nevegaciones de boton correctas -> Navegacion hacia vistas de Logeo y Registro al presionar botones', () => {
    const navigation = { navigate: jest.fn() };
    const { getByText } = render(<MainScreen navigation={navigation} />);

    fireEvent.press(getByText('Iniciar Sesión'));
    expect(navigation.navigate).toHaveBeenCalledWith('Login');

    fireEvent.press(getByText('Registrarse'));
    expect(navigation.navigate).toHaveBeenCalledWith('Registro');
  });
});
