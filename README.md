# Events Test Applications

This is a Rails and React application with simple API operations and pages that
allows users to create and find events.

# Setup

You can configure the application ro run locally by simply running the
following, once you have the right Ruby version `2.5.3` set in the
current directory:

```
bin/setup
```

This will guide you through the process of basic configuration.

# Testing

You can tun all tests using: `yarn test`.

## Rails

Rails tests are run using RSpec, which you can run `rspec` from console to
perform all available tests.

## React

React tests are run using Jest, which you can run `yarn jest` from console to
perform all available tests.

## Lint

All the application linters are run automatically before a commit is actually
performed. You can manually run Rubocop (`rubocop [FILES]`) for ruby files or
ESLint (`yarn eslint [FILES]`) for react files.

# Live

The live version is hosted on heroku. You can access using the following link:
[https://carlos-evtests.herokuapp.com/](https://carlos-evtests.herokuapp.com/)
