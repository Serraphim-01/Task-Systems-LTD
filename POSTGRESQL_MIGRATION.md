# PostgreSQL Migration and Deployment Guide

This document summarizes the migration from SQLite/JSON file storage to PostgreSQL and provides an overview of the deployment configurations for Docker and Azure.

## Migration Overview

The project has been successfully migrated from a JSON-based file storage system (lib/sqlite.ts) to PostgreSQL database. This migration provides:

- **Better Performance**: PostgreSQL offers superior query performance and indexing
- **Data Integrity**: ACID compliance and relational constraints
- **Scalability**: Supports concurrent connections and large datasets
- **Production Ready**: Battle-tested database with extensive tooling
- **Cloud Native**: Easy deployment to managed PostgreSQL services

## Changes Made

### 1. Database Layer

**New Files:**
- `lib/postgres.ts` - PostgreSQL connection module with compatible interface
- `migration_postgres.sql` - PostgreSQL schema migration script

**Modified Files:**
- `app/actions.ts` - Updated import from sqlite to postgres
- `components/admin/actions.ts` - Updated import from sqlite to postgres
- `components/admin/people-actions.ts` - Updated import from sqlite to postgres

**Removed Dependencies:**
- The old JSON-based file storage system (lib/sqlite.ts) is no longer used but kept for reference

### 2. Dependencies

**Added:**
- `pg` - PostgreSQL client library
- `@types/pg` - TypeScript definitions for pg

### 3. Configuration

**Environment Variables:**
```bash
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=tsl_site
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

### 4. Build Configuration

**Modified:**
- `next.config.js` - Added `output: 'standalone'` for Docker deployment

## Deployment Options

### Option 1: Docker Deployment

**Best for:** Local development, testing, and small-scale production deployments

**Files:**
- `Dockerfile` - Multi-stage Docker build configuration
- `docker-compose.yml` - Docker Compose orchestration with PostgreSQL
- `.dockerignore` - Files to exclude from Docker build

**Quick Start:**
```bash
docker-compose up --build
```

**Documentation:** See `DOCKER_DEPLOYMENT.md` for detailed instructions

**Advantages:**
- Simple setup with single command
- Isolated development environment
- Easy local testing
- Reproducible builds

**Considerations:**
- Requires Docker installation
- Manual scaling for production
- Self-managed database backups

### Option 2: Azure Deployment

**Best for:** Production deployments, enterprise environments, and cloud-native applications

**Files:**
- `azure.yaml` - Azure Container Apps configuration
- `.env.azure` - Azure environment variables template
- `deploy-azure.sh` - Automated Azure deployment script

**Quick Start:**
```bash
chmod +x deploy-azure.sh
./deploy-azure.sh
```

**Documentation:** See `AZURE_DEPLOYMENT.md` for detailed instructions

**Advantages:**
- Fully managed services
- Auto-scaling capabilities
- Built-in monitoring and logging
- High availability
- Global CDN
- Managed database with automatic backups
- Enterprise-grade security

**Considerations:**
- Azure account required
- Learning curve for Azure services
- Ongoing cloud costs

## Database Schema

The PostgreSQL schema includes the following tables:

### Content Tables
- `announcements`, `announcement_sections`, `announcement_section_content`
- `blogs`, `blog_sections`, `blog_section_content`
- `events`, `event_sections`, `event_section_content`

### People Tables
- `directors`, `director_sections`, `director_section_content`
- `management`, `management_sections`, `management_section_content`

### Other Tables
- `jobs` - Job postings
- `page_descriptions` - Page metadata
- `achievements`, `awards`, `certificates` - Company achievements
- `partners` - Partner organizations

### Key Features
- **JSONB Support**: Flexible content storage in JSON format
- **Foreign Key Constraints**: Data integrity with CASCADE deletes
- **Indexes**: Optimized query performance
- **Timestamps**: Automatic created_at and updated_at tracking

## Migration Steps for Existing Data

If you have existing data in the JSON files, follow these steps to migrate:

### 1. Backup Existing Data

```bash
# Backup the data directory
cp -r data data_backup
```

### 2. Run Database Migration

```bash
# For Docker
docker-compose up postgres
docker exec -it tsl_site_postgres psql -U postgres -d tsl_site -f /docker-entrypoint-initdb.d/migration.sql

# For Azure
psql -h <postgres-host> -U <username> -d tsl_site -f migration_postgres.sql
```

### 3. Migrate Data (Manual Process)

You'll need to write a migration script to convert JSON data to PostgreSQL format. The script should:

1. Read JSON files from the `data` directory
2. Transform data to match PostgreSQL schema
3. Insert data into appropriate tables
4. Handle relationships and foreign keys

Example migration approach:
```typescript
// Create a migration script
import fs from 'fs';
import { getDb } from './lib/postgres';

async function migrateData() {
  const db = await getDb();
  
  // Read JSON files
  const directors = JSON.parse(fs.readFileSync('data/directors.json', 'utf8'));
  
  // Insert into PostgreSQL
  for (const director of directors) {
    await db.request()
      .input('name', director.name)
      .input('position', director.position)
      .input('image_path', director.image_path)
      .query('INSERT INTO directors (name, position, image_path) VALUES ($1, $2, $3)');
  }
  
  console.log('Migration complete');
}

migrateData();
```

## Environment Configuration

### Local Development

Create `.env.local`:
```bash
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=tsl_site
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

### Docker

Environment variables are set in `docker-compose.yml`

### Azure

Use `.env.azure` as a template and configure secrets in Azure Portal or Key Vault

## Testing the Migration

### 1. Test Database Connection

```typescript
import { healthCheck } from './lib/postgres';

const isHealthy = await healthCheck();
console.log('Database health:', isHealthy);
```

### 2. Test Basic Operations

```typescript
import { getDb } from './lib/postgres';

const db = await getDb();
const result = await db.request().query('SELECT * FROM directors');
console.log('Directors:', result.recordset);
```

### 3. Test Application

```bash
# Start the application
npm run dev

# Or with Docker
docker-compose up

# Verify the application works at http://localhost:3000
```

## Performance Considerations

### PostgreSQL Optimization

1. **Connection Pooling**: The postgres.ts module includes connection pooling
2. **Indexes**: The migration script includes indexes on frequently queried columns
3. **Query Optimization**: Use EXPLAIN ANALYZE to optimize slow queries
4. **Monitoring**: Monitor query performance and database metrics

### Application Optimization

1. **Caching**: Implement caching for frequently accessed data
2. **Lazy Loading**: Load data only when needed
3. **Pagination**: Use pagination for large datasets
4. **Static Generation**: Use Next.js static generation where possible

## Security Best Practices

### Database Security

1. **Strong Passwords**: Use strong, unique passwords for PostgreSQL
2. **Least Privilege**: Use read-only users where appropriate
3. **Network Security**: Restrict database access to trusted IPs
4. **Encryption**: Enable SSL/TLS for database connections
5. **Regular Updates**: Keep PostgreSQL updated with security patches

### Application Security

1. **Environment Variables**: Never commit secrets to version control
2. **Secret Management**: Use Azure Key Vault or similar for production
3. **Input Validation**: Validate all user inputs
4. **SQL Injection**: Use parameterized queries (already implemented)
5. **HTTPS**: Always use HTTPS in production

## Monitoring and Maintenance

### Database Monitoring

- **Query Performance**: Monitor slow queries
- **Connection Usage**: Track connection pool usage
- **Disk Space**: Monitor database storage usage
- **Backup Status**: Verify backups are running successfully

### Application Monitoring

- **Error Logs**: Monitor application error logs
- **Performance Metrics**: Track response times
- **Uptime**: Monitor application availability
- **Resource Usage**: Track CPU and memory usage

## Troubleshooting

### Common Issues

**Database Connection Failed:**
- Check PostgreSQL is running
- Verify connection parameters
- Check firewall rules
- Review database logs

**Migration Errors:**
- Ensure PostgreSQL version compatibility
- Check for existing tables
- Verify SQL syntax
- Review error messages

**Application Errors:**
- Check environment variables
- Verify database schema
- Review application logs
- Test database queries directly

## Rollback Plan

If you need to rollback to the previous JSON-based system:

1. Stop the application
2. Restore the data directory from backup
3. Revert code changes to use sqlite.ts
4. Restart the application

```bash
# Restore from backup
rm -rf data
cp -r data_backup data

# Revert imports in code
# Change postgres back to sqlite in:
# - app/actions.ts
# - components/admin/actions.ts
# - components/admin/people-actions.ts
```

## Additional Resources

### Documentation
- `DOCKER_DEPLOYMENT.md` - Complete Docker deployment guide
- `AZURE_DEPLOYMENT.md` - Complete Azure deployment guide
- `migration_postgres.sql` - Database schema definition

### External Resources
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Azure Documentation](https://docs.microsoft.com/azure/)
- [Next.js Documentation](https://nextjs.org/docs)

## Support

For issues or questions:
1. Check the troubleshooting section in relevant deployment guides
2. Review PostgreSQL logs for database issues
3. Check application logs for application issues
4. Consult the official documentation for each service

## Summary

This migration successfully:
- ✅ Replaced JSON file storage with PostgreSQL
- ✅ Maintained backward compatibility with existing code
- ✅ Provided Docker deployment configuration
- ✅ Provided Azure deployment configuration
- ✅ Created comprehensive documentation
- ✅ Implemented security best practices
- ✅ Optimized for performance

The application is now ready for production deployment using either Docker or Azure Container Apps with PostgreSQL.
