import React from 'react';
import { render } from '@testing-library/react-native';
import ScreenTestMain from '../app/ScreenM'; 

describe('ScreenTestMain', () => {
  it('Renderizacion del Menu principal', () => {
    const { getByText, getByTestId } = render(<ScreenTestMain />);

    // Verifica que se renderice el texto de bienvenida
    expect(getByText('BIENVENIDO')).toBeTruthy();

    // Verifica que se rendericen otros elementos clave
    expect(getByText('MOVIL')).toBeTruthy();
    expect(getByText('Por favor Identifíquese')).toBeTruthy();
    expect(getByText('Iniciar Sesión')).toBeTruthy();
    expect(getByText('No tiene cuenta?')).toBeTruthy();
    expect(getByText('Registrarse')).toBeTruthy();
  });
});
