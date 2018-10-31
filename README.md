ember-cli-page-progress
==============================================================================

A handy transition indicator wrote without the jQuery dependency.

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


## Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd my-addon`
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

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
