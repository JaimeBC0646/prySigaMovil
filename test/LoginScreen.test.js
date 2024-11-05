import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import LoginScreen from '../views/Login';

// Mocks para la navegación y el fetch
const mockNavigation = { navigate: jest.fn() };
global.fetch = jest.fn();

describe('LoginScreen', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockNavigation.navigate.mockClear();
    jest.spyOn(Alert, 'alert'); // Mock de Alert.alert
  });

  afterEach(() => {
    Alert.alert.mockClear();
  });



  it('Navegacion de logeo -> Navegación a "SesionUser" en un inicio de sesión exitoso', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ success: true }),
    });

    const { getByText, getByPlaceholderText } = render(<LoginScreen navigation={mockNavigation} />);

    fireEvent.changeText(getByPlaceholderText('user'), 'Jimmy03');
    fireEvent.changeText(getByPlaceholderText('pass'), '12345');
    fireEvent.press(getByText('ACCEDER'));

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('SesionUser');
    });
  });



  it('Alerta de error correcto -> Inicio de sesión fallido', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ success: false }),
    });
  
    const { getByText, getByPlaceholderText } = render(<LoginScreen navigation={mockNavigation} />);
  
    fireEvent.changeText(getByPlaceholderText('user'), 'asd');
    fireEvent.changeText(getByPlaceholderText('pass'), '54321');
    fireEvent.press(getByText('ACCEDER'));
  
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Usuario o contraseña incorrectos');
      expect(mockNavigation.navigate).not.toHaveBeenCalled();
    });
  });

  
});
