---
title: "Configure multiple entry points for Create React App without the eject"
excerpt: "Create React App is opinionated and hides build configuration. Learn how to configure multiple entry points without ejecting using Webpack dynamic imports, keeping your builds fast and maintainable."
date: "2022-04-03"
---

Create React App is an opinionated and officially supported tool to set up a React application with no configuration. It comes with some tradeoffs - the build configuration is hidden and you have to use `npm run eject` script to edit this configuration. In this case, you'll stay one-on-one with fighting build configuration and dependencies mismatch during an upgrade.

Having multiple entry points is one of the reasons why people usually decide to maintain their own build configuration instead of using CRA. In this post, we'll see how to configure multiple entry points without eject using Webpack dynamic imports.

Suppose you'd like to have the following project structure:

```
src/
 - admin/
  - index.js
 - client/
  - index.js
 - shared/
  - index.js
```

Our goals are the following:

1. 2 separate builds for the client app and the admin app. The code from one app shouldn't appear in the code of another app.
2. Both apps can reuse code from a shared folder

Let's start:

```bash
npx create-react-app multiple-entry-points && cd multiple-entry-points
```

Verify it's up and running by:

```bash
npm run start
```

## Step 1. Prepare the folder structure

Let's create all the needed folders and files using [Bash's path expansion](https://bash.cyberciti.biz/guide/Path_name_expansion):

```bash
mkdir src/{client,admin,shared}
touch src/{client,admin,shared}/index.jsx
```

Now if you run `tree src/ -tr` you'll see the following structure:

```
src
├── shared
│   └── index.jsx
├── client
│   └── index.jsx
├── admin
│   └── index.jsx
├── setupTests.js
├── reportWebVitals.js
├── logo.svg
├── index.js
├── index.css
├── App.test.js
├── App.js
└── App.css
```

## Step 2. Write React components

Now we can add basic components and a shared function that can be used in both apps.

```javascript
// src/shared/index.jsx:
export const getSharedData = () => 'shared code'
```

```javascript
// src/admin/index.jsx
import React from 'react';
import { getSharedData } from "../shared";

export const App = () => <h1>Admin app {getSharedData()}</h1>
```

```javascript
// src/client/index.jsx
import React from 'react';
import { getSharedData } from "../shared";

export const App = () => <h1>Client app {getSharedData()}</h1>
```

## Step 3. Set up the index files

We are going to create an index file that loads our apps using the dynamic imports. Dynamic imports is a perfect fit if you wish to load a module conditionally or on demand. Let's see how to use them. Suppose you have a module `sum.js`:

```javascript
export const sum = (a, b) => a + b;
```

Then you can dynamically load it:

```javascript
import(`./sum.js`).then(({ sum }) => {
  console.log(sum(1, 2));
});
```

There are some restrictions about this syntax:

1. Import path must start with `./` or `../`.
2. Our modules should belong to the same directory
3. An import path may contain a concatenation with a variable. Example: `import(./translation/${language})`. During the build a bundler gathers all the files in the translation directory and replaces this code with something like this:

```javascript
const loadDynamically = (path) => {
  switch (path) {
    case 'en.js':
      return import('./translation/en.js');
    case 'de.js':
      return import('./translation/de.js');
    ...
  }
}

loadDynamically(language)
```

It shouldn't be possible for a bundler to load an arbitrary file from a file system. That's why these limitations exist.

So for our project we'd need something like this in the `src/index.js`:

```javascript
import ReactDOM from 'react-dom';

const getIndexFile = () => {
  // Determine index file somehow
}

import(`./index/${getIndexFile()}`).then((module) => {
  // Use ReactDOM.render to render components
})
```

As I said before our modules should belong to the same directory. But files `admin/index.js` and `client/index.js` are located in different directories. Let's create a folder with 2 files - a file to import the admin project and a file to import the client project:

```bash
mkdir src/index
touch src/index/{index-client.jsx,index-admin.jsx}
```

The contents:

```javascript
// src/index/index-admin.jsx
import { App } from "../admin"

export const render = () => <App/>
```

```javascript
// src/index/index-client.jsx
import { App } from "../client"

export const render = () => <App/>
```

Then we can hardcode the returning value of `getIndexFile` and test the build for the first time:

```javascript
import ReactDOM from 'react-dom';

const getIndexFile = () => {
  return 'index-admin'
}

import(`./index/${getIndexFile()}`).then(({ render }) => {
  ReactDOM.render(render, document.getElementById('root'))
})
```

It shows a page with "Admin app shared" text. Let's add `console.log` statements to make sure the code from the client app doesn't appear in the bundle:

```javascript
// src/admin/index.jsx
// ...

console.log('admin')
```

```javascript
// src/client/index.jsx
// ...

console.log('client')
```

Now if you re-run the server you'll see only admin log statement in the browser console.

## Step 4. Determine which app to load

The only thing left is to determine what `getIndexFile` function should return. There are many ways how to achieve it. For example we can check the current hostname or use environment variables. The truth is that you better use both of them to speed up your CI and have a good developer experience. Let's start with environment variables:

```javascript
import ReactDOM from 'react-dom';

const getIndexFile = () => {
  const environments = {
    ADMIN: 'index-admin',
    CLIENT: 'index-client',
  }

  const buildTarget = process.env.REACT_APP_BUILD_TARGET;
  const result = environments[buildTarget]

  // A check to avoid typo
  if (!result) {
    throw new Error(`Incorrect REACT_APP_BUILD_TARGET varaible: ${buildTarget}`);
  }

  return result;
}

import(`./index/${getIndexFile()}`).then(({ render }) => {
  ReactDOM.render(render, document.getElementById('root'))
})
```

Here we determine which module to load based on our custom environment variable. [CRA requires to prefix custom environment variables](https://create-react-app.dev/docs/adding-custom-environment-variables/) with `REACT_APP_`.

Now we can add 2 scripts to `package.json` for easy switching between the environments:

```json
"scripts": {
  "start:admin": "REACT_APP_BUILD_TARGET=ADMIN react-scripts start",
  "start:client": "REACT_APP_BUILD_TARGET=CLIENT react-scripts start",
}
```

Feel free to test it and switch between the projects. If you'd like to run these project at the same time you can specify the port to avoid conflicts between Node.js processes:

```json
"scripts": {
  "start:admin": "PORT=3001 REACT_APP_BUILD_TARGET=ADMIN react-scripts start",
  "start:client": "REACT_APP_BUILD_TARGET=CLIENT react-scripts start",
}
```

## Step 5. Build the app

You can go further and use the same environment-based approach to build your app. In this case you'd need 2 more scripts in your `package.json`:

```json
"scripts": {
  "build:admin": "REACT_APP_BUILD_TARGET=ADMIN react-scripts build",
  "build:client": "REACT_APP_BUILD_TARGET=CLIENT react-scripts build",
}
```

This approach works fine except it requires to make 2 builds on CI which is time-consuming and not effective as it could. To avoid it you can determine which app to load in production based on current hostname. This is how the complete version of `src/index.js` looks like:

```javascript
import ReactDOM from 'react-dom';

const getIndexFile = () => {
  const environments = {
    ADMIN: 'index-admin',
    CLIENT: 'index-client',
  }

  const buildTarget = process.env.REACT_APP_BUILD_TARGET;

  if (buildTarget) {
    const result = environments[buildTarget]
    // A check to avoid typo
    if (!result) {
      throw new Error(`Incorrect REACT_APP_BUILD_TARGET: ${buildTarget}`)
    }
    return result
  }

  switch (window.location.hostname) {
    case 'admin.project.com':
      return environments.ADMIN
    case 'client.project.com':
      return environments.CLIENT
    default:
      throw new Error(`Unknown host ${window.location.hostname}`)
  }
}

import(`./index/${getIndexFile()}`).then(({ render }) => {
  ReactDOM.render(render, document.getElementById('root'))
})
```

It is enough to build it once on CI:

```json
"scripts": {
  "build": "react-scripts build"
}
```

## Conclusion

We've configured CRA to have multiple entry points. Both apps don't interfere with each other and can reuse shared code. Our CI is still fast because we build the app only once. The source code for the demo is available here [on GitHub](https://github.com/kubk/blog/tree/master/demo/multiple-entry-points)
