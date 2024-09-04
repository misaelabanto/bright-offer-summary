# Bright Solar Offer Sumary Backend

This project utilizes NestJS for the backend with SQLite as the database and features message scheduling and offers management functionalities.

## Table of Contents
- [Bright Solar Offer Sumary Backend](#bright-solar-offer-sumary-backend)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Environment Variables](#environment-variables)
  - [Project Structure](#project-structure)
    - [Key Modules](#key-modules)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
    - [Open API Documentation with Scalar](#open-api-documentation-with-scalar)
  - [Database](#database)
    - [Generating Migrations](#generating-migrations)
    - [Running Migrations](#running-migrations)
  - [Testing](#testing)
    - [Running Tests](#running-tests)
  - [Available Scripts](#available-scripts)

## Getting Started

This is a NestJS-based backend project designed for message scheduling and management. It uses SQLite as the database and `pnpm` as the package manager.

### Prerequisites

Ensure you have the following installed:
- Node.js (v16 or higher)
- pnpm
- SQLite

### Environment Variables

Create a `.env` file in the root of your project with the following variables:

```bash
PORT=3000
FRONTEND_URL=<your-frontend-url>
WHATSAPP_MESSAGING_API_URL=<your-whatsapp-api-url>
```

## Project Structure

```bash
├── src/
│   ├── api/                     # Contains API controllers
│   │   ├── message/             # Message API controller and module
│   │   ├── status/              # Status API controller
│   ├── common/                  # Common utilities like database config and typings
│   ├── drizzle-schema.ts        # Drizzle ORM schema definitions
│   ├── http/                    # HTTP service providers
│   ├── message/                 # Message-related logic, DTOs, and services
│   ├── offer/                   # Offer-related logic, DTOs, and services
│   ├── scheduling/              # Cron scheduling providers
│   ├── app.module.ts            # Main application module
│   └── main.ts                  # Entry point for the application
├── drizzle/                     # Migration scripts
├── package.json                 # Dependencies and scripts
└── .env                         # Environment configuration
```

### Key Modules

- **Message API**: Handles creation, update, and retrieval of scheduled messages.
- **Status API**: Provides application health status.
- **Offer Module**: Manages solar offers and related services.
- **Cron Scheduling**: Implements the scheduling of events for message delivery.

## Installation

Install dependencies using `pnpm`:

```bash
pnpm install
```

## Running the Project

Start the development server:

```bash
pnpm run dev
```

This will start the NestJS application, and the server will be running on `http://localhost:3000`.

### Open API Documentation with Scalar

API documentation is automatically generated and available at `http://localhost:3000/docs`.

## Database

This project uses **SQLite** with **Drizzle ORM**. You can find the migration files in the `drizzle` folder.

### Generating Migrations

To generate new migrations, run:

```bash
pnpm db:generate
```

### Running Migrations

To run the migrations, use:

```bash
pnpm db:migrate
```

## Testing

This project uses **Vitest** for unit testing.

### Running Tests

To run the test suite, execute:

```bash
pnpm run test
```

Tests can be found in the `src` directory, with coverage reports enabled by default.

## Available Scripts

- `pnpm run dev`: Starts the development server.
- `pnpm run test`: Runs the unit tests.
- `pnpm db:generate`: Generates new database migrations.
- `pnpm db:migrate`: Runs the database migrations.
