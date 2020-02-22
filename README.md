ember-cli-page-progress
==============================================================================
[![npm version](https://badge.fury.io/js/ember-cli-page-progress.svg)](https://badge.fury.io/js/ember-cli-page-progress) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.com/tigressbailey/ember-cli-page-progress.svg?branch=master)](https://travis-ci.com/tigressbailey/ember-cli-page-progress)
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-page-progress.svg)](https://emberobserver.com/addons/ember-cli-page-progress)

A handy transition indicator wrote without the jQuery dependency.

[Demo site](https://tigressbailey.github.io/ember-cli-page-progress/)


## 🎉 This addon supports Ember 3 now.

  - Please read the upgrade guide if you try to use the v2.0.0 version on Ember 3.
  - Please install v1.3.3 and read the v1.3.3 guide on Ember 2.

## 🏁 ==== Guide for v2.0.0 ====

### Prerequisites
------------------------------------------------------------------------------

- Ember.js v3.12 or above
- Ember CLI v2.13 or above
- Node.js v10 or above

### Installation
------------------------------------------------------------------------------

```
ember install ember-cli-page-progress
```


### Usage
------------------------------------------------------------------------------

2 steps can make this addon work:

1. Add the component to `application.hbs`
    ```
    <PageProgress />
    ```

2. Import page progress service and add the loading in the application route - `application.js`
   Comparing to v1.3.3, the Mixin is not formally recommended.

   ```
   import { inject as service } from '@ember/service';
   import Route from '@ember/routing/route';
   import { action, get } from '@ember/object';

   export default class Application extends Route {
     @service pageProgress;
     @action
     async loading(transition) {
       const pageProgress = get(this, 'pageProgress');
       pageProgress.start(transition.targetName);
       transition.promise.finally(() => {
         pageProgress.done();
       });
       return true;
     }
   }
   ```

------------------------------------------------------------------------------

## 🏁 ==== Guide for v1.3.3 ====

### Installation
------------------------------------------------------------------------------

```
ember install ember-cli-page-progress@~1.3.3
```


### Usage
------------------------------------------------------------------------------

2 steps can make this addon work:

1. Add the component to `application.hbs`
    ```
    {{page-progress}}
    ```

2. Import progress mixin and extend it in the application route - `application.js`

   ```
   import ProgressMixin from './../mixins/progress';

   export default Ember.Route.extend(ProgressMixin, {...});
   ```

------------------------------------------------------------------------------

## Configuration
------------------------------------------------------------------------------

1. Speed:

   It represents the increasing speed of the progress bar.

   Default value is 200 if you don't provide it.

   Please provide value as milliseconds.

   For example:

   v2.0.0
   ```
   <PageProgress @speed={{300}} />
   ```

   v1.3.3
   ```
   {{page-progress speed=300}}
   ```

2. Minimum:

   It represents the bar width at the start point.

   Default value is 0.08 if you don't provide it.

   Please provide value as float.

   For example:

   v2.0.0
   ```
   <PageProgress @minimum={{0.1}} />
   ```

   v1.3.3
   ```
   {{page-progress minimum=0.1}}
   ```

3. Background:

   It represents the bar background color.

   Default value is red if you don't provide it.

   Please provide value as string.

   For example:
   v2.0.0
   ```
   <PageProgress @background={{"green"}} />
   ```
   or
   ```
   <PageProgress @background={{"#29d"}} />
   ```

   v1.3.3
   ```
   {{page-progress background="green"}}
   ```
   or
   ```
   {{page-progress background="#29d"}}
   ```

4. Global Configuration:

    If would like to exclude the included css file, include the folling to your `ember-cli-build.js` file:

    ```js
    let app = new EmberApp(defaults, {
        'ember-cli-page-progress': {
          includeCss: false
        }
      }
    });
    ```

    Provide your own CSS instead:

    ```css
    .page-progress {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1031;
      pointer-events: none;
    }

    .page-progress .bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 0;
      height: 3px;
      box-shadow: 0 0 10px rgba(0, 13, 41, 0.8);
      transition: none;
    }
    ```

## Contributing
------------------------------------------------------------------------------

### Installation

* `git clone https://github.com/tigressbailey/ember-cli-page-progress.git`
* `cd ember-cli-page-progress`
* `npm install`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## Contributors
------------------------------------------------------------------------------
- :tiger: [Bailey Zhang](https://tigressbailey.github.io)

- [Donald Wasserman](<https://github.com/donaldwasserman>
)

## License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
