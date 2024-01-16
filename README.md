# nuxt-intercom

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> This module is for Nuxt 2 only. For a Nuxt 3 version, please see https://github.com/devonik/nuxt-3-intercom

[🚀 **Demo Site available here**](https://nuxt-intercom.netlify.com)

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `@hexdigital/nuxt-intercom` dependency to your project

```bash
yarn add @hexdigital/nuxt-intercom # or npm install @hexdigital/nuxt-intercom
```

Add `@hexdigital/nuxt-intercom` to the buildModules section of nuxt.config.js

```js
{
  buildModules: [
    '@hexdigital/nuxt-intercom',
  ],
  intercom: {
    appId: 'XXXXXXXXXX',
  },
}
```

## Options
Defaults:

```js
const defaults = {
  appId: null, // Intercom ID
  autoBoot: true, // True to boot messenger widget and show UI on page load, false to allow manually booting later
  debug: false, // True to show debug messages in the console, useful for development, false to not show them

  config: {}, // Object to specify messenger attributes to configure when booting. see https://developers.intercom.com/installing-intercom/docs/javascript-api-attributes-objects#section-messenger-attributes

  scriptId: 'intercom-script', // String to identfy the script tag, for vue-meta
  scriptDefer: false, // True to defer loading intercom widget javascript until page loads, false to async load it in document flow

  updateOnPageRoute: true // True to call intercom's 'update' method on route change, false to not do this
};
```

## Usage

## Development

1. Clone this repository
2. Install devDependencies using `yarn install`
3. Start development server using `yarn dev` or `INTERCOM_ID=<your intercom id> yarn dev` if you want to provide customer INTERCOM_ID.

## License
[MIT License](https://github.com/hex-digital/nuxt-intercom/blob/master/LICENSE)

Copyright (c) Hex Digital

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@hexdigital/nuxt-intercom/latest.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/@hexdigital/nuxt-intercom

[npm-downloads-src]: https://img.shields.io/npm/dt/@hexdigital/nuxt-intercom.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@hexdigital/nuxt-intercom

[circle-ci-src]: https://img.shields.io/circleci/project/github/hex-digital/nuxt-intercom.svg?style=flat-square
[circle-ci-href]: https://circleci.com/gh/hex-digital/nuxt-intercom

[codecov-src]: https://img.shields.io/codecov/c/github/hex-digital/nuxt-intercom.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/hex-digital/nuxt-intercom

[license-src]: https://img.shields.io/npm/l/@hexdigital/nuxt-intercom.svg?style=flat-square
[license-href]: https://npmjs.com/package/@hexdigital/nuxt-intercom
