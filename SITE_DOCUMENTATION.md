# Site Documentation

This document provides a general overview of the project, its structure, and how to get started.

## Project Overview

This is a Next.js web application for Task Systems, an enterprise ICT solutions provider. The website showcases the company's services, portfolio, partners, and other relevant information. It also includes an admin panel for managing site content.

## Technologies Used

*   **Framework**: [Next.js](https://nextjs.org/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
*   **Database**: [Azure SQL](https://azure.microsoft.com/en-us/products/azure-sql/database/)
*   **File Storage**: [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs)
*   **Form Management**: [React Hook Form](https://react-hook-form.com/)
*   **Schema Validation**: [Zod](https://zod.dev/)

## Project Structure

The project follows the standard Next.js `app` directory structure:

*   `app/`: Contains all the routes and pages of the application.
    *   `app/api/`: API routes for handling server-side logic like newsletter sign-ups and file uploads.
    *   `app/admin/`: The admin panel for managing site content.
    *   `app/(site)/`: The public-facing pages of the website.
*   `components/`: Contains all the reusable React components used throughout the application.
    *   `components/ui/`: UI components from Shadcn UI.
    *   `components/home/`: Components specific to the home page.
    *   `components/admin/`: Components for the admin panel.
*   `lib/`: Contains utility functions and helper modules.
    *   `lib/azure.ts`: Handles the connection to the Azure SQL database.
    *   `lib/storage.ts`: Handles file uploads and deletions to Azure Blob Storage.
    *   `lib/utils.ts`: General utility functions.
*   `public/`: Contains all the static assets like images, videos, and fonts.
*   `types/`: Contains all the TypeScript type definitions.

## Getting Started

To get the project up and running locally, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone <repository_url>
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up environment variables**:
    Create a `.env.local` file in the root of the project. Copy the contents of `.env.example` (if it exists) or `AZURE_CONFIGURATION.md` and fill in the required values for the Azure SQL database and Azure Blob Storage.

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

    The application should now be running at [http://localhost:3000](http://localhost:3000).

## Deployment

The application is ready to be deployed on any platform that supports Next.js, such as Vercel, Netlify, or Azure App Service.

When deploying, make sure to set the environment variables in your hosting provider's settings. The build command is `npm run build` and the start command is `npm start`.
