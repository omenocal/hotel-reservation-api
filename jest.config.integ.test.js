module.exports = {
  moduleNameMapper: {
    '@functions/(.*)': '<rootDir>/src/functions/$1',
    '@libs/(.*)': '<rootDir>/src/libs/$1',
  },
  testEnvironment: "node",
  testMatch: [
    "**/integ/**/*.integ.test.ts"
  ],
};
