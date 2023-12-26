# Client end-2-end automated tests

## Setup
1. Set your credentials in `config/config.data.json`
2. Install node `v.14.20.0`
3. Install dependencies `npm install`

## Running the tests

#### Store tests

`npm run test:store`

#### Wallet tests

`npm run test:wallet`

#### Marketplace tests

`npm run test:market`

#### All tests

`npm run test:all`

## Allure

- To manually generate the Allure report run `npm run posttest`

## Notes

- If your Ultra client is installed in a different location than `C:/Program Files/Ultra_Dev/Application/ultra.exe` you can change it in `tests/helpers/common.helper.ts` - `executablePath` parameter.
- If you get an error when generating the Allure report, check that you have Java installed.

##How to encrypt data file?

`https://ultraio.atlassian.net/wiki/spaces/QA/pages/2262827009/Setting+up+and+running+client+automation+tests`
