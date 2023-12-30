const nextJest = require("next/jest");

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  modulePaths: ["<rooDir>/src"],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,ts,jsx,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/*.type.ts",
    "!<rootDir>/.next/**",
    "!<rootDir>/coverage/**",
    "!<rootDir>/*.config.js",
    "!<rootDir>/src/middlewares",
    "!<rootDir>/src/lib/**",
    "!<rootDir>/src/middlewares/**",
    "!<rootDir>/src/pages/api/**",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
