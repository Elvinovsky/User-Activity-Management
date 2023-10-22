module.exports = {
  testEnvironment: 'node',
  testRegex:   '.e2e.test.js$',
  testTimeout: 10000,
  transform: {
    '.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js',]
};
