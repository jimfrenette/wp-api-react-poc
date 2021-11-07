# wp-api-react-poc
Proof of concept WordPress plugin to submit posts from the front end using the WordPress REST API and React

<br />

## webpack

[@wordpress/scripts](https://www.npmjs.com/package/@wordpress/scripts)

This script uses webpack behind the scenes. It’ll look for a webpack config in the top-level directory of your package and will use it if it finds one. If none is found, it’ll use the default config provided by @wordpress/scripts packages. Learn more in the [Advanced Usage](https://www.npmjs.com/package/@wordpress/scripts#advanced-usage) section.

Our webpack config, `webpack.config.js` makes `React` and `ReactDOM` available outside of the bundle to prevent import errors when using 3rd party React libs.
```js
const defaults = require("@wordpress/scripts/config/webpack.config");

module.exports = {
  ...defaults,
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
};
```

``` bash
# install dependencies
npm install

# build for dev with watch
npm start

# build for production with minification
npm run build
```
