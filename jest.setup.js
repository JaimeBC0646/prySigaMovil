import '@testing-library/jest-native/extend-expect';

// Mock de imágenes y otros assets
jest.mock('./assets/images/SIGA.png', () => 'SIGA.png');
jest.mock('./assets/images/SigaLogo.png', () => 'SigaLogo.png');
jest.mock('./assets/images/icon_close.png', () => 'icon_close.png');
