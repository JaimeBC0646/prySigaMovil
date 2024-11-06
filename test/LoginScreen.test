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
    jest.spyOn(Alert, 'alert').mockImplementation(() => {}); // Mock limpio para Alert.alert
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpiar todos los mocks después de cada prueba
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
    }, { timeout: 10000 });// Reducir el timeout para esta condición específica
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
    }, { timeout: 3000 });
  });


});
