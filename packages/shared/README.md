
# @bright-offer-summary/shared

This package contains shared types and utilities used across the Bright Offer Summary project. It includes TypeScript type definitions and other shared resources.

## Table of Contents

- [@bright-offer-summary/shared](#bright-offer-summaryshared)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Exports](#exports)
    - [Message Types](#message-types)
    - [Offer Types](#offer-types)
  - [Development](#development)
    - [Scripts](#scripts)
    - [Project Structure](#project-structure)
    - [TypeScript Configuration](#typescript-configuration)

## Installation

To install the `@bright-offer-summary/shared` package, use your package manager of choice:

```sh
npm install @bright-offer-summary/shared
```

or

```sh
yarn add @bright-offer-summary/shared
```

## Usage

Import the necessary types from the package in your TypeScript files:

```ts
import { IMessage, MessageStatus } from '@bright-offer-summary/shared';
import { ICreateOfferDto, IUpdateOfferDto, IOffer } from '@bright-offer-summary/shared';
```

## Exports

### Message Types

- `ICreateMessageDto`: Interface for creating a message.
- `IUpdateMessageDto`: Interface for updating a message.
- `IMessage`: Interface representing a message.
- `MessageStatus`: Enum representing the status of a message.

### Offer Types

- `ICreateOfferDto`: Interface for creating an offer.
- `IUpdateOfferDto`: Interface for updating an offer.
- `IOffer`: Interface representing an offer.

## Development

### Scripts

`shared` package uses lint script for development:

- `lint`: Run ESLint to check for code quality issues.

You can run these scripts using npm or yarn:

```sh
pnpm build
pnpm lint
```

### Project Structure

The project structure is organized as follows:

```
shared/
├── package.json
├── README.md
└── src/
    ├── index.ts
    ├── message/
    │   ├── dto/
    │   │   ├── create-message.dto.ts
    │   │   └── update-message.dto.ts
    │   ├── message-status.ts
    │   └── message.ts
    └── offer/
        ├── dto/
        │   ├── create-offer.dto.ts
        │   └── update-offer.dto.ts
        └── offer.ts
```

### TypeScript Configuration

The TypeScript configuration is defined in the `tsconfig.json` file. It extends the shared configuration from `@bright-offer-summary/typescript-config`