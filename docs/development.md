# Getting Started

This project includes the following:

- Code linting with ESLint
- Code formatting with Prettier
- Static types with TypeScript
- API mocking with MSW
- Unit testing with Vitest and Testing Library
- E2E testing with Playwright
- Remix web framework
- Tailwind css framework

## Dependencies

To work with this project you will need to have the following installed on your computer:

- Git
- NodeJS 16.14.0

Note that we are using Node v16.14.0 because Storybook does not yet support
versions >= 18.

It is recommended to use a version manager for Node, such as [asdf](https://asdf-vm.com). This project includes a `.tools-versions` file so if you are using asdf you can run `asdf install` in the project directory to install the correct version of Node locally.

## Getting Start

Install node modules with `npm install`.

When you run npm install, pre-commit hooks will be automatically installed on your computer. These hooks will ensure that code you check into the repo is linted and formatted. The pre-commit hooks use the `npm run lint:fix` and `npm run format` commands respectively. There should be no need for you to run these commands manually.

### Storybook

You can work on individual components without running the whole website. This is done by launching the Storybook development environment.

```
npm run storybook
```

This will start tailwind in watch mode and start the Storybook server in watch mode as well. Changes that you make to components will be reflected in Storybook in realtime.

### Website

```
npm run dev
```

This will start tailwind in watch mode and start the Remix dev server in watch mode as well. Changes that you make to the website will be automatically picked up.

### Tests

- Run unit tests with `npm run test`
- Run E2E tests in Chrome, Firefox, and Safari with `npm run test:e2e`

### Validate

If you want to check that everything is in good working order you can run `npm run validate`. This will lint the project, typecheck it, run unit tests, and run e2e tests reporting back any errors.
