module.exports = {
    preset: 'react-native',
    transformIgnorePatterns: [
        'node_modules/(?!((react-native|@react-native|@react-navigation|@react-native-community|expo(-.*)?|@expo(-.*)?)/))',
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
        '^.+\\.(js|ts|tsx)$': 'babel-jest',
    },
};