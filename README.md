# vsf-wp-rest-api

Wordpress REST API module for Vue Storefront providing an out-of-box routing and data handling.

<br>

## Installation

<br>

## 1. Download the module

<br>

Go to your theme's main directory and run:

<br>

```
npm install @vue-wordpress/core
```
or
```
yarn add @vue-wordpress/core
```

<br>

Go to your `vue-storefront`'s `modules` catalog and clone the repository with the module.

<br>

```
cd ../vue-storefront/src/modules;
git submodule add https://github.com/new-fantastic/vsf-wp-rest-api.git;
```

<br>

This will create a Git Submodule for your `vue-storefront` repository. Thanks to that you will be able pull for new updates :)

<br>

### 2. Import and register the module inside `vue-storefront/src/modules/index.ts`

<br>

```js
import { WpRestApi } from './vsf-wp-rest-api' // if installed via Git
// or
import { WpRestApi } from 'vsf-wp-rest-api'  // if installed via NPM
...
export const registerModules: VueStorefrontModule[] = [
...
WpRestApi
...
]
```
