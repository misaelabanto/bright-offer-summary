# @bright-offer-summary/ui

This project is a React component library designed to provide reusable UI components for the Bright Offer Summary application. It includes various input components and a countdown timer component.

## Table of Contents
- [@bright-offer-summary/ui](#bright-offer-summaryui)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Components](#components)
    - [Button](#button)
    - [CountDown](#countdown)
    - [DateInput](#dateinput)
    - [NumberInput](#numberinput)
    - [TextInput](#textinput)
    - [TimeInput](#timeinput)
  - [Development](#development)
    - [Scripts](#scripts)
    - [Linting](#linting)
    - [Generating Components](#generating-components)
  - [Configuration](#configuration)
    - [TypeScript](#typescript)
    - [ESLint](#eslint)

## Installation

To install the dependencies for this project, use the following command:

```sh
pnpm install
```

## Usage

To use the components in this library, import them into your React application:

```tsx
import { Button, CountDown, DateInput, NumberInput, TextInput, TimeInput } from '@bright-offer-summary/ui';

const App = () => (
  <div>
    <Button>Click Me</Button>
    <CountDown days={1} hours={2} minutes={30} seconds={45} />
    <DateInput label="Date" />
    <NumberInput label="Number" />
    <TextInput label="Text" />
    <TimeInput label="Time" />
  </div>
);
```

## Components

### Button

The `Button` component is a simple button element.

```tsx
import { Button } from '@bright-offer-summary/ui';

<Button>Click Me</Button>
```

### CountDown

The `CountDown` component displays a countdown timer.

```tsx
import { CountDown } from '@bright-offer-summary/ui';

<CountDown days={1} hours={2} minutes={30} seconds={45} />
```

### DateInput

The `DateInput` component is an input field for dates.

```tsx
import { DateInput } from '@bright-offer-summary/ui';

<DateInput label="Date" />
```

### NumberInput

The `NumberInput` component is an input field for numbers.

```tsx
import { NumberInput } from '@bright-offer-summary/ui';

<NumberInput label="Number" />
```

### TextInput

The `TextInput` component is an input field for text.

```tsx
import { TextInput } from '@bright-offer-summary/ui';

<TextInput label="Text" />
```

### TimeInput

The `TimeInput` component is an input field for time.

```tsx
import { TimeInput } from '@bright-offer-summary/ui';

<TimeInput label="Time" />
```

## Development

### Scripts

- `pnpm lint`: Runs ESLint to check for code quality issues.
- `pnpm generate:component`: Generates a new React component using Turborepo Generators.

### Linting

To lint the code, run:

```sh
pnpm lint
```

### Generating Components

To generate a new React component, run:

```sh
pnpm generate:component
```

You will be prompted to enter the name of the component. The generator will create a new component file in the `src` directory and update the `package.json` file.

## Configuration

### TypeScript

The TypeScript configuration is defined in the `tsconfig.json` and `tsconfig.lint.json` files. It extends the shared configuration from `@bright-offer-summary/typescript-config`.

### ESLint

The ESLint configuration is defined in the `.eslintrc.js` file. It extends the shared configuration from `@bright-offer-summary/eslint-config`.
