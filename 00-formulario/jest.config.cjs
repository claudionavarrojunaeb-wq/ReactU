module.exports = {
  preset: 'ts-jest',
  // Use the built-in 'jsdom' environment to avoid environment package mismatch
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', { tsconfig: 'tsconfig.jest.json', useESM: true }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['./src/setupTests.ts']
  ,
  moduleNameMapper: {
    "\\.css$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$": "<rootDir>/__mocks__/fileMock.js"
  }
};
