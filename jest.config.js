module.exports = {
    verbose: true,
    transform: {
        '^.+\\.(js|jsx)?$': 'babel-jest',
        '.+\\.(css|styl|less|sass|scss)$': 'jest-transform-css'
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    setupFilesAfterEnv: ['./src/setupTests.js'],
    testEnvironment: 'jsdom'
}
