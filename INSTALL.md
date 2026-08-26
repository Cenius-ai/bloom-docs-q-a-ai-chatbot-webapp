# Installation Guide

## 1. Prerequisites

- **Node.js** version 20 or later (required by `package.json` `engines`)
- **npm** (comes with Node.js; the project uses npm as package manager)

## 2. Get the Code

Clone the project repository to your local machine.

```bash
git clone <repository-url>
cd bloom
```

## 3. Install Dependencies

Run the following command to install all required npm packages:

```bash
npm install
```

## 4. Environment Variables

No environment variables are required for the application to run. The development server script uses the `PORT` variable to set the listen port (default `4200`). You can set it if needed:

```bash
export PORT=8080
```

## 5. Development Server

Start the Angular development server with:

```bash
npm run dev
```

This will serve the app at `http://localhost:4200` and automatically reload on code changes.

## 6. Production Build

To create an optimized production build, run:

```bash
npm run build
```

The build artifacts will be output to the `dist/` directory.

## 7. Testing

No automated tests are configured in this project.

## 8. Troubleshooting

- **`npm install` fails**: Ensure you are using Node.js 20 or later. Check your version with `node --version`.
- **Port conflict**: If port 4200 is in use, set the `PORT` environment variable to a different value before starting the development server.
- **Angular CLI errors**: Make sure TypeScript 5.5 is installed (it is listed as a dev dependency). If issues persist, delete `node_modules` and `package-lock.json` and re-run `npm install`.