module.exports = {
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|lang-app-mvp|expo|aws-amplify)/)'
  ],
  preset: 'jest-expo'
};