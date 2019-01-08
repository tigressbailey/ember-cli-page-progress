ember-cli-page-progress
==============================================================================
[![npm version](https://badge.fury.io/js/ember-cli-page-progress.svg)](https://badge.fury.io/js/ember-cli-page-progress) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.com/tigressbailey/ember-cli-page-progress.svg?branch=master)](https://travis-ci.com/tigressbailey/ember-cli-page-progress)
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-page-progress.svg)](https://emberobserver.com/addons/ember-cli-page-progress)

A handy transition indicator wrote without the jQuery dependency.

[Demo site](https://tigressbailey.github.io/ember-cli-page-progress/)

## Installation
------------------------------------------------------------------------------

```
ember install ember-cli-page-progress
```


## Usage
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


That's it. The page progress bar will display when transitions happens among the routes.

## Configuration
------------------------------------------------------------------------------

I opened 3 variables in v1.1.0.

1. speed:

   It represents the increasing speed of the progress bar.

   Default value is 200 if you don't provide it.

   Please provide value as milliseconds.

   For example:

   ```
   {{page-progress speed=300}}
   ```

2. minimum:

   It represents the bar width at the start point.

   Default value is 0.08 if you don't provide it.

   Please provide value as float.

   For example:
   ```
   {{page-progress minimum=0.1}}
   ```

2. background:

   It represents the bar background color.

   Default value is red if you don't provide it.

   Please provide value as string.

   For example:
   ```
   {{page-progress background="green"}}
   ```
   or
   ```
   {{page-progress background="#29d"}}
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

## Author
------------------------------------------------------------------------------
:tiger: [Bailey Zhang](https://tigressbailey.github.io)

## License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
