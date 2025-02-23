const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  clearMocks: true,
  preset: 'ts-jest',
  transform: {
    "^.+\\.(ts|tsx|js|jsx|mjs|cjs)$": [
      "babel-jest",
      { 
        presets: [
          ["@babel/preset-env", { targets: { node: "current" }, modules: "auto" }],
          "@babel/preset-react",
          "@babel/preset-typescript"
        ]
      }
    ],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    'node_modules/(?!query-string)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  coverageProvider: "v8",
};

module.exports = createJestConfig(config);
