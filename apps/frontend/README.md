# Bright Solar Offer Sumary Frontend

This is the frontend app for Bright Solar Summary scheduling.
It uses ReactJS with vite for scheduling and viewing scheduled messages.

## Table of Contents
- [Bright Solar Offer Sumary Frontend](#bright-solar-offer-sumary-frontend)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Environment Variables](#environment-variables)
  - [Project Structure](#project-structure)
    - [Key Components](#key-components)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
  - [Available Scripts](#available-scripts)
    - [`pnpm dev`](#pnpm-dev)
    - [`pnpm build`](#pnpm-build)
    - [`pnpm lint`](#pnpm-lint)
  - [Testing](#testing)
    - [Running Tests](#running-tests)

## Getting Started

This project is a React-based frontend application using TypeScript. It is structured for message scheduling and viewing functionality, alongside other components like an About page.

### Prerequisites

Make sure you have the following installed:
- Node.js (v16 or higher)
- pnpm
- Vite (build tool)

### Environment Variables

Create a `.env` file at the root of the project with the following environment variables:

```bash
VITE_BACKEND_URL=<backend-url>
```

## Project Structure

```bash
├── src/
│   ├── about/                    # About page components
│   ├── assets/                   # Static assets like images and SVGs
│   ├── common/                   # Shared components (GenericError)
│   ├── home/                     # Home page components
│   ├── message/                  # Message-related components, forms, hooks, etc.
│   │   ├── hooks/                # Hooks for fetching messages and creating messages
│   │   ├── id/                   # Components for viewing individual messages
│   │   ├── schedule/             # Components for scheduling a message
│   │   ├── tests/                # Unit tests for message components
│   ├── router.tsx                # React Router configuration
│   ├── App.tsx                   # Main app component
│   ├── main.tsx                  # Entry point for the application
│   ├── index.css                 # Global CSS with Tailwind
└── public/                       # Public assets (favicon, etc.)
```

### Key Components
- **HomePage**: Located in `src/home/page.tsx`, this is the main landing page with navigation to messages, schedule, and about sections.
- **MessagesPage**: Found in `src/message/page.tsx`, this page lists all scheduled messages.
- **MessageForm**: Found in `src/message/message-form.tsx`, this component is responsible for the scheduling of messages.
- **MessageIdPage**: Found in `src/message/id/page.tsx`, this page shows a detailed view of a specific message.
- **AboutPage**: Found in `src/about/page.tsx`, this component displays project and author information.

## Installation

To install the dependencies, run:

```bash
pnpm install
```

## Running the Project

To run the project locally, use the following command:

```bash
pnpm dev
```

This will start the Vite development server, and the project will be available at `http://localhost:3000`.

## Available Scripts

### `pnpm dev`
Starts the development server.

### `pnpm build`
Builds the application for production.

### `pnpm lint`
Runs the linter to check for code style and errors.

## Testing

This project uses **Vitest** and **React Testing Library** for testing.

### Running Tests

To run the test suite, execute:

```bash
pnpm test
```

This will run all unit tests located in the `src/message/tests/` directory.
