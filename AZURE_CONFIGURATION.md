# Azure Configuration

This file contains the necessary environment variables to connect the application to Azure SQL and Azure Blob Storage.

## Environment Variables

Create a `.env.local` file in the root of your project and add the following variables:

```
# Azure SQL Database
AZURE_SQL_USER="your_database_user"
AZURE_SQL_PASSWORD="your_database_password"
AZURE_SQL_SERVER="your_database_server.database.windows.net"
AZURE_SQL_DATABASE="your_database_name"

# Azure Blob Storage
AZURE_STORAGE_CONNECTION_STRING="your_storage_connection_string"
AZURE_STORAGE_CONTAINER_NAME="your_storage_container_name"
```

### Azure SQL Database

*   `AZURE_SQL_USER`: The username for your Azure SQL database.
*   `AZURE_SQL_PASSWORD`: The password for your Azure SQL database.
*   `AZURE_SQL_SERVER`: The server name for your Azure SQL database.
*   `AZURE_SQL_DATABASE`: The name of your Azure SQL database.

You can find these values in the Azure portal under the "Connection strings" section of your Azure SQL database.

### Azure Blob Storage

*   `AZURE_STORAGE_CONNECTION_STRING`: The connection string for your Azure Storage account.
*   `AZURE_STORAGE_CONTAINER_NAME`: The name of the container you created in your Azure Storage account.

You can find these values in the Azure portal under the "Access keys" section of your Azure Storage account.
