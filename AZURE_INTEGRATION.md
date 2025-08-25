# Azure Integration Documentation

This document provides a detailed explanation of how the application is integrated with Azure services, specifically Azure SQL and Azure Blob Storage.

## Overview

The application uses Azure for its backend infrastructure:
*   **Azure SQL**: A relational database service used to store all the application's data, such as user information, content, and more.
*   **Azure Blob Storage**: A cloud object storage solution used to store all the static files, such as images and videos.

## Azure SQL Integration

The application connects to an Azure SQL database to store and retrieve data.

### Setting up Azure SQL

To set up an Azure SQL database, follow these steps:

1.  **Create an Azure SQL Database**:
    *   Go to the Azure portal and create a new SQL database.
    *   Choose a subscription, resource group, and server.
    *   Configure the database with a name, compute + storage, and networking options.
    *   **Important**: Make sure to allow Azure services and resources to access this server.

2.  **Get Connection Details**:
    *   Once the database is created, go to the "Connection strings" section to get the server name.
    *   You will also need the database name, username, and password you configured during setup.

### Environment Variables

The following environment variables are required to connect to the Azure SQL database. You should add these to your `.env.local` file.

```
# Azure SQL Database
AZURE_SQL_USER="your_database_user"
AZURE_SQL_PASSWORD="your_database_password"
AZURE_SQL_SERVER="your_database_server.database.windows.net"
AZURE_SQL_DATABASE="your_database_name"

# Read-only user (optional but recommended)
AZURE_SQL_RO_USER="your_database_ro_user"
AZURE_SQL_RO_PASSWORD="your_database_ro_password"
```

### Database Connection Logic

The database connection logic is located in `lib/azure.ts`.

*   It uses the `mssql` library to connect to the database.
*   It creates a connection pool to efficiently manage database connections.
*   It provides two functions for getting a database connection:
    *   `getDb()`: Returns a read/write connection to the database.
    *   `getRoDb()`: Returns a read-only connection to the database. This is used for all public-facing data fetching to improve security.

### Database Schema

The database schema is defined in `MIGRATION_STEPS.md`. It includes tables for `directors`, `management`, and their associated content sections.

## Azure Blob Storage Integration

The application uses Azure Blob Storage to store and manage all static files, such as images and videos.

### Setting up Azure Blob Storage

To set up Azure Blob Storage, follow these steps:

1.  **Create a Storage Account**:
    *   In the Azure portal, create a new Storage Account.
    *   Choose a subscription, resource group, and region.
    *   Select "Standard" performance and "StorageV2 (general purpose v2)" account kind.

2.  **Create a Blob Container**:
    *   Inside the storage account, go to "Containers" and create a new container.
    *   Set the public access level to "Blob (anonymous read access for blobs only)".

3.  **Get Connection String**:
    *   In the storage account, go to "Access keys" and copy one of the connection strings.

### Environment Variables

The following environment variables are required to connect to Azure Blob Storage. You should add these to your `.env.local` file.

```
# Azure Blob Storage
AZURE_STORAGE_CONNECTION_STRING="your_storage_connection_string"
AZURE_STORAGE_CONTAINER_NAME="your_storage_container_name"
```

### File Storage Logic

The file storage logic is located in `lib/storage.ts`.

*   It uses the `@azure/storage-blob` library to interact with the storage account.
*   It provides two main functions:
    *   `uploadFile(file, folder, fileNameBase)`: Uploads a file to the specified folder in the blob container. It returns the public URL of the uploaded file.
    *   `deleteFile(fileUrl)`: Deletes a file from the blob container based on its URL.

## Data Migration

The `MIGRATION_STEPS.md` file contains detailed instructions on how to migrate data from a previous system (like Supabase) to Azure SQL and Azure Blob Storage. This includes:

*   Exporting data from the old database and importing it into Azure SQL.
*   Downloading files from the old storage and uploading them to Azure Blob Storage.
*   Updating the database to reflect the new file URLs in Azure Blob Storage.
