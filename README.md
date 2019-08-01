# vsf-wp-json

<br>

Wordpress REST API module for Vue Storefront providing an out-of-box routing and data handling.

<br>

## Installation

<br>

### 1. Download the module

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

After that, add module to modules/index.js:

<br>

```ts
import { WpJson } from './vsf-wp-json'

//...

export const registerModules: VueStorefrontModule[] = [
  // ...
    WpJson,
  // ...
]
```

<br>

Open config file, then at the end of main object add:

<br>

```json
"wordpressCms": {
  "url": "https://your-wordpress-url.com/",
  "lang": "en",
  "menus": ["for-buyers", "footer"]
}
```

<br>

If you want to register plugin, you can do it by adding in **`wordpressCms`** - plugins, e.g.:

<br>

```json
"wordpressCms": {
  "url": "https://your-wordpress-url.com/",
  "lang": "en",
  "menus": ["for-buyers", "footer"],
  "plugins": "acf"
}
```

<br>

Plugins should be inside `node_modules/@vue-wordpress`. They also should have **`vue-wp-json`** prefix.
