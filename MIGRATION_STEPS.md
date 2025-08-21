# Migration from Supabase to Azure SQL and Azure Blob Storage

This document outlines the steps to migrate the database from Supabase to Azure SQL and the file storage from Supabase Storage to Azure Blob Storage.

## 1. Set up Azure Resources

### 1.1. Azure SQL Database

1.  **Create an Azure SQL Database:**
    *   Go to the Azure portal and create a new SQL database.
    *   Choose a subscription, resource group, and server.
    *   Configure the database with a name, compute + storage, and networking options.
    *   **Important:** Make sure to allow Azure services and resources to access this server.

2.  **Get Connection String:**
    *   Once the database is created, go to the "Connection strings" section and copy the ADO.NET connection string. You will need this for the application.

### 1.2. Azure Blob Storage

1.  **Create a Storage Account:**
    *   In the Azure portal, create a new Storage Account.
    *   Choose a subscription, resource group, and region.
    *   Select "Standard" performance and "StorageV2 (general purpose v2)" account kind.

2.  **Create a Blob Container:**
    *   Inside the storage account, go to "Containers" and create a new container.
    *   Set the public access level to "Blob (anonymous read access for blobs only)".

3.  **Get Access Keys:**
    *   In the storage account, go to "Access keys" and copy one of the connection strings. You will need this for the application.

## 2. Database Schema Migration

The following SQL script can be used to create the necessary tables in your Azure SQL database. This script is adapted from the Supabase migration files.

```sql
-- Create the directors table
CREATE TABLE directors (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(MAX) NOT NULL,
    position NVARCHAR(MAX) NOT NULL,
    image_path NVARCHAR(MAX),
    company NVARCHAR(MAX),
    person_group NVARCHAR(MAX),
    created_at DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET()
);

-- Create the management table
CREATE TABLE management (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(MAX) NOT NULL,
    position NVARCHAR(MAX) NOT NULL,
    image_path NVARCHAR(MAX),
    company NVARCHAR(MAX),
    person_group NVARCHAR(MAX),
    created_at DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET()
);

-- Create director_sections table
CREATE TABLE director_sections (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    director_id BIGINT NOT NULL FOREIGN KEY REFERENCES directors(id) ON DELETE CASCADE,
    section_order INT NOT NULL,
    layout NVARCHAR(MAX) NOT NULL CHECK (layout IN ('one_column', 'two_column')),
    created_at DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET()
);

-- Create director_section_content table
CREATE TABLE director_section_content (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    section_id BIGINT NOT NULL FOREIGN KEY REFERENCES director_sections(id) ON DELETE CASCADE,
    content_order INT NOT NULL,
    content_type NVARCHAR(MAX) NOT NULL CHECK (content_type IN ('text', 'image_with_description')),
    content NVARCHAR(MAX) NOT NULL,
    created_at DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET()
);

-- Create management_sections table
CREATE TABLE management_sections (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    management_id BIGINT NOT NULL FOREIGN KEY REFERENCES management(id) ON DELETE CASCADE,
    section_order INT NOT NULL,
    layout NVARCHAR(MAX) NOT NULL CHECK (layout IN ('one_column', 'two_column')),
    created_at DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET()
);

-- Create management_section_content table
CREATE TABLE management_section_content (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    section_id BIGINT NOT NULL FOREIGN KEY REFERENCES management_sections(id) ON DELETE CASCADE,
    content_order INT NOT NULL,
    content_type NVARCHAR(MAX) NOT NULL CHECK (content_type IN ('text', 'image_with_description')),
    content NVARCHAR(MAX) NOT NULL,
    created_at DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET()
);
```

## 3. Data Migration

### 3.1. Database Data

1.  **Export data from Supabase:**
    *   Go to your Supabase project's table editor.
    *   Export each table as a CSV file.

2.  **Import data into Azure SQL:**
    *   Use the SQL Server Import and Export Wizard or a tool like DBeaver or Azure Data Studio to import the CSV files into the corresponding tables in your Azure SQL database.

### 3.2. Image Files

1.  **Download files from Supabase Storage:**
    *   Download all the files from your Supabase Storage buckets.

2.  **Upload files to Azure Blob Storage:**
    *   Upload the downloaded files to the Azure Blob Storage container you created.
    *   You can use the Azure Storage Explorer for a user-friendly interface to upload the files.
    *   **Important:** After uploading, you will need to update the `image_path` columns in the `directors` and `management` tables to reflect the new URLs of the images in Azure Blob Storage.

## 4. Application Configuration

1.  **Install new dependencies:**
    *   You will need to add the necessary libraries for connecting to Azure SQL and Azure Blob Storage.
    *   For Azure SQL, you can use a library like `tedious`.
    *   For Azure Blob Storage, you can use the `@azure/storage-blob` package.

2.  **Update environment variables:**
    *   In your Next.js project, create a `.env.local` file if you don't have one already.
    *   Add the following environment variables:
        ```
        AZURE_SQL_CONNECTION_STRING="your_azure_sql_connection_string"
        AZURE_STORAGE_CONNECTION_STRING="your_azure_storage_connection_string"
        AZURE_STORAGE_CONTAINER_NAME="your_azure_storage_container_name"
        ```

3.  **Update the code:**
    *   Replace the Supabase client (`lib/supabase.ts`) with new clients for Azure SQL and Azure Blob Storage.
    *   Update all the data fetching and mutation logic to use the new Azure clients.
    *   Update the file upload logic to use the new Azure Blob Storage client.
