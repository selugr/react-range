# React Range Component

This project contains a responsive and customized React Range component inside of a demo environment.\
It's written in react and packaged by webpack with the help of babel.

For testing demonstration, a mock api with the array values is provided by https://www.mockable.io/ service.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Install dependencies

Once the project is cloned or downloaded to a local folder. Perform this command to install dependencies.

### `yarn install` / `npm install`

## Available Scripts

In the project directory, you can run:

### `yarn start` / `npm start`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `yarn lint` / `npm run lint`

Checks code to comply with the given rules in .eslintrc.js (for javascript files) and .stylelintrc.json (for css files).

It's also preconfigured to fix all missmatchings.

### `yarn test` / `npm run test`

Launches the test runner in the interactive watch mode.

### `yarn build` / `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, splitted into chunks and the filenames include the hashes.

### `yarn serve` / `npm run serve`

Once you deploy the application by running the build command, it's possible to serve the production version by executing this command.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## Attributes
There are several attributes which must be implemented to work properly:

- **rangeValues**: It provides a values array to the component which will be used to set min and max range values as well as intermediate values when array length is greater than 2.
- **onChangeMin**: It provides a callback function to be called on minimum filter change providing new value as an argument.
- **onChangeMax**: It provides a callback function to be called on maximum filter change providing new value as an argument.

## Modes

**Continuous Mode**

It's automatically enabled when only two values are provided by rangeValues array attribute.

*Optional Attributes for continuous mode*
- **filtersOffset**: It sets a threshold offset between minimum and maximum filters (by defatul: 1) *Optional*
- **updateOnEnd**: Callback functions are called only on end (default value: **false**). It can be enabled for performance reasons. *Optional*

**Staggered Mode**

It's automatically enabled when more than two values are provided by rangeValues array attribute.
