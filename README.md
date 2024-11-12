# Wealth Health - HRnet

## Overview

`Wealth Health` is a React application designed to help HR department managing the Wealth Health team. This project includes support for multiple languages, allowing users to interact with the app in their preferred language.

## Prerequisites

Ensure you have Node.js and npm (or yarn) installed.

## Setup

Clone the repository:

```bash
$git clone <repository-url>
$cd wealth_health
```

## Install dependencies:

```bash
$npm install
```

### or

```bash
$yarn install
```

## Usage

To run the app locally:

```bash
$npm run dev
```

# or

```bash
$yarn dev
```

Then, open http://localhost:5173 in your browser to view the app.

## Internationalization (i18n)

This application uses i18next and react-i18next to support multiple languages.

- **Default Language**: English
- **Language Detection**: Uses i18next-browser-languagedetector to detect the user’s language preference.
- **Adding New Languages**: To add a new language, create a new translation file in the locales folder (or your specific directory) and add the language to the i18next configuration.

## Scripts

The following scripts are available:

- **Development**: Start a development server

```bash
$npm run dev
```

- **Build**: Build the app for production

```bash
$npm run build
```

- **Preview**: Preview the production build

```bash
$npm run preview
```

- **Lint**: Run ESLint to check for code issues

```bash
$npm run lint
```

- **Test**: Run tests using Jest

```bash
$npm run test
```

## Technologies Used

- **React**: Frontend library for building user interfaces
- **Vite**: Build tool for optimized development and production builds
- **React Table**: For data table features
- **FontAwesome**: For icons
- **Jest**: Testing framework for JavaScript
- **i18next**: For internationalization
- **ESLint**: For linting and code quality

## Folder Structure

A basic overview of the folder structure:

```plaintext
wealth_health/
├── public/                 # Static files
├── src/
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # Reusable UI components
│   ├── i18n/            # i18n translation files
│   ├── pages/              # Page components
│   ├── App.jsx             # Main App component
│   └── index.js            # Entry point
├── .eslintrc.js            # ESLint configuration
├── babel.config.js         # Babel configuration
└── jest.config.js          # Jest configuration
```

## License

No licence
