# nuxt-intercom

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Intercom Module for Nuxt.js

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `@hexdigital/nuxt-intercom` dependency to your project

```javascript
yarn add @hexdigitalnuxt-intercom # or npm install @hexdigitalnuxt-intercom
```

Add `@hexdigital/nuxt-intercom` to the buildModules section of nuxt.config.js

```javascript
{
  buildModules: [
    '@hexdigital/nuxt-intercom',
  ],
  intercom: {
    id: 'XXXXXXXXXX',
  },
}
```

## Options
Defaults:
```javascript
const defaults = {
  id: null, // Intercom ID
  scriptDefer: false, // True to load intercom script on page load, false to allow manually adding later
  updateOnPageRoute: true, // True to call intercom's 'update' method on route change, false to not do this
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
