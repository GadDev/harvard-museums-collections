# GOM Bank

A web application for bank accounts management, so accounts can be managed (created, edited, searched and deleted) and fund transfers can be performed between accounts.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Scripts](#scripts)
  - [Development](#development)
  - [Build](#build)
  - [Start](#start)
  - [Lint](#lint)
  - [Test](#test)
  - [Formatting](#formatting)
  - [JSON Server](#json-server)
  - [Start Application](#start-application)
- [Contributing](#contributing)
- [License](#license)

## Overview

This app is using the following stack:

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Shadcn UI](https://shadcn.dev/)
- **Formatting**: [Prettier](https://prettier.io/)
- **Testing**: [Jest](https://jestjs.io/) | [RTL](https://testing-library.com/docs/react-testing-library/intro/)
- **Mocked server**: [JSON-server](https://github.com/typicode/json-server)
- **HTTP-client**: [Axios](https://axios-http.com/)
- **Data fetching**: [React Query](https://tanstack.com/query/latest)

## Getting Started [![MIT Licensed](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To get started with this project, follow the instructions below.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 20.9.0)
- [npm](https://www.npmjs.com/) (version 10.1.0)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

## Scripts

Here are the various scripts you can run in this project:

### Development

To start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

This will start the Next.js development server.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

To build the application for production:

```bash
npm run build
```

### Start

To start the application in production mode:

```bash
npm run start
```

Make sure to run npm run build before running this script.

### Lint

To lint your code:

```bash
npm run lint
```

This will run the linter to check for code quality issues.

### Test

To lint the tests:

```bash
npm test
```

To run the tests in watch mode:

```bash
npm run test:watch
```

### Formatting

To check code formatting:

```bash
npm run format
```

To automatically fix formatting issues:

```bash
npm run format:fix
```

### JSON server

To start the JSON server

```bash
npm run json-server
```

This will start a JSON server on port 5000 using the db.json file.

### Start application locally

To start both the JSON server and the application concurrently:

```bash
npm run start:app
```

This uses concurrently to run both npm run json-server and npm start in parallel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
