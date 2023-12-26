const suites = {
  store: ['<rootDir>/specs/store/*.spec.js'],
  wallet: ['<rootDir>/specs/wallet/*.spec.js'],
  api: ['<rootDir>/specs/api/*.spec.js'],
  auth: ['<rootDir>/specs/authentication/*.spec.js'],
  demo: ['<rootDir>/specs/user-settings/display-account-settings.spec.js'],
  market: ['<rootDir>/specs/marketplace/*.spec.js'],
  gdc: ['<rootDir>/specs/game-dev-center/*.js'],
  usr_sett: ['<rootDir>/specs/user-settings/*.js'],
  game: ['<rootDir>/specs/game-dev-center/game/*.spec.js'],
  ultra_cloud: ['<rootDir>/specs/game-dev-center/ultra-cloud/*.spec.js'],
  help_center: ['<rootDir>/specs/game-dev-center/help-center/check-help-center.spec.js'],
  token_swap: ['<rootDir>/specs/wallet/token-swap.spec.js'],
  master_center: ['<rootDir>/specs/master-center/*.spec.js'],
  all: [
    '<rootDir>/specs/api/*.spec.js',
    '<rootDir>/specs/authentication/*.spec.js',
    '<rootDir>/specs/game-dev-center/*.js',
    '<rootDir>/specs/game-dev-center/game/*.spec.js',
    '<rootDir>/specs/game-dev-center/help-center/check-help-center.spec.js',
    '<rootDir>/specs/game-dev-center/ultra-cloud/*.spec.js',
    '<rootDir>/specs/marketplace/*.spec.js',
    '<rootDir>/specs/master-center/*.js',
    '<rootDir>/specs/store/*.spec.js',
    '<rootDir>/specs/user-settings/*.js',
    '<rootDir>/specs/wallet/*.spec.js',
  ],
  create_test_data: [
    '<rootDir>/specs/api/*.spec.js',
    '<rootDir>/specs/authentication/signup_after_filling_valid_data.spec.js',
    '<rootDir>/specs/game-dev-center/game/create-game.spec.js',
    '<rootDir>/specs/master-center/create-company.spec.js',
  ],
};

module.exports = suites;