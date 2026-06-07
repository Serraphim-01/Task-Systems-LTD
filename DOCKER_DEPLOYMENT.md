# Docker Deployment Guide

This guide provides detailed instructions for deploying the Task Systems LTD website using Docker and Docker Compose with PostgreSQL.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Docker** (version 20.10 or higher)
- **Docker Compose** (version 2.0 or higher)
- **Git** (for cloning the repository)

## Project Architecture

The application consists of:

- **Next.js Application**: A React-based frontend framework
- **PostgreSQL Database**: Relational database for storing all application data
- **Docker Containers**: Isolated environments for both the app and database

## Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd tsl_site
```

### 2. Build and Run with Docker Compose

```bash
docker-compose up --build
```

This command will:
- Build the Next.js application Docker image
- Pull the PostgreSQL Docker image
- Create and start both containers
- Run the database migration script automatically
- Start the application on port 3000

### 3. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## Detailed Deployment Steps

### Step 1: Environment Configuration

The application uses environment variables for configuration. The default values are set in `docker-compose.yml`:

```yaml
environment:
  POSTGRES_HOST: postgres
  POSTGRES_PORT: 5432
  POSTGRES_DATABASE: tsl_site
  POSTGRES_USER: postgres
  POSTGRES_PASSWORD: postgres
```

**Security Note**: For production deployments, change these default credentials.

### Step 2: Database Migration

The PostgreSQL container automatically runs the migration script on startup:

- **Migration File**: `migration_postgres.sql`
- **Location**: Mounted at `/docker-entrypoint-initdb.d/migration.sql`
- **Execution**: Runs only when the database is first created

The migration creates all necessary tables:
- announcements, announcement_sections, announcement_section_content
- blogs, blog_sections, blog_section_content
- events, event_sections, event_section_content
- jobs, page_descriptions, achievements, awards, certificates
- directors, director_sections, director_section_content
- management, management_sections, management_section_content
- partners

### Step 3: Building the Application

The Docker build process uses a multi-stage build:

1. **Base Stage**: Sets up Node.js 18 Alpine
2. **Dependencies Stage**: Installs npm dependencies
3. **Builder Stage**: Builds the Next.js application
4. **Runner Stage**: Creates a minimal production image

### Step 4: Running the Containers

```bash
# Start containers in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Stop containers and remove volumes
docker-compose down -v
```

## Docker Compose Services

### PostgreSQL Service

```yaml
postgres:
  image: postgres:15-alpine
  container_name: tsl_site_postgres
  restart: unless-stopped
  ports:
    - "5432:5432"
  volumes:
    - postgres_data:/var/lib/postgresql/data
```

**Features**:
- Uses PostgreSQL 15 Alpine for minimal footprint
- Persists data using Docker volumes
- Health check ensures database is ready before app starts
- Automatic migration on first run

### Application Service

```yaml
app:
  build:
    context: .
    dockerfile: Dockerfile
  container_name: tsl_site_app
  restart: unless-stopped
  ports:
    - "3000:3000"
  depends_on:
    postgres:
      condition: service_healthy
```

**Features**:
- Multi-stage Docker build for optimized image size
- Waits for PostgreSQL to be healthy before starting
- Automatic restart on failure
- Exposes port 3000 for web access

## Docker Commands Reference

### Building Images

```bash
# Build without starting containers
docker-compose build

# Rebuild from scratch (no cache)
docker-compose build --no-cache

# Build specific service
docker-compose build app
```

### Managing Containers

```bash
# Start containers
docker-compose up

# Start in detached mode
docker-compose up -d

# Stop containers
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop and remove containers and volumes
docker-compose down -v

# Restart containers
docker-compose restart
```

### Viewing Logs

```bash
# View all logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View specific service logs
docker-compose logs app
docker-compose logs postgres

# View last 100 lines
docker-compose logs --tail=100
```

### Database Management

```bash
# Connect to PostgreSQL container
docker exec -it tsl_site_postgres psql -U postgres -d tsl_site

# Backup database
docker exec tsl_site_postgres pg_dump -U postgres tsl_site > backup.sql

# Restore database
docker exec -i tsl_site_postgres psql -U postgres tsl_site < backup.sql

# View database tables
docker exec -it tsl_site_postgres psql -U postgres -d tsl_site -c "\dt"
```

## Production Deployment

### Security Considerations

1. **Change Default Credentials**: Update PostgreSQL password in `docker-compose.yml`
2. **Use Secrets**: Use Docker secrets for sensitive data
3. **Network Isolation**: Use custom Docker networks
4. **SSL/TLS**: Enable HTTPS for production
5. **Regular Updates**: Keep Docker images updated

### Environment Variables for Production

Create a `.env.production` file:

```bash
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DATABASE=tsl_site
POSTGRES_USER=secure_user
POSTGRES_PASSWORD=secure_password_here
NODE_ENV=production
```

Update `docker-compose.yml` to use the env file:

```yaml
services:
  app:
    env_file:
      - .env.production
```

### Scaling the Application

```bash
# Scale to 3 instances
docker-compose up --scale app=3

# Note: You'll need a load balancer for production scaling
```

### Resource Limits

Add resource constraints to `docker-compose.yml`:

```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

## Troubleshooting

### Container Won't Start

```bash
# Check container status
docker-compose ps

# View logs for errors
docker-compose logs app

# Check if port 3000 is already in use
lsof -i :3000
```

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# Test database connection
docker exec tsl_site_postgres pg_isready

# Check PostgreSQL logs
docker-compose logs postgres
```

### Permission Issues

```bash
# Fix file permissions
sudo chown -R $USER:$USER .

# Rebuild with proper permissions
docker-compose down
docker-compose up --build
```

### Migration Issues

```bash
# Manually run migration
docker exec -i tsl_site_postgres psql -U postgres -d tsl_site < migration_postgres.sql

# Reset database (WARNING: Deletes all data)
docker-compose down -v
docker-compose up --build
```

## Performance Optimization

### Build Optimization

The Dockerfile uses multi-stage builds to:
- Reduce final image size
- Separate build dependencies from runtime
- Enable layer caching for faster rebuilds

### Database Optimization

PostgreSQL configuration can be customized by adding a `postgresql.conf` file:

```bash
# Add to docker-compose.yml
volumes:
  - ./postgresql.conf:/etc/postgresql/postgresql.conf
```

### Application Optimization

- Enable Next.js production mode
- Use static generation where possible
- Implement caching strategies
- Optimize images and assets

## Monitoring and Maintenance

### Health Checks

Both services include health checks:

```bash
# Check service health
docker-compose ps
```

### Backup Strategy

```bash
# Automated backup script
#!/bin/bash
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

docker exec tsl_site_postgres pg_dump -U postgres tsl_site > $BACKUP_DIR/backup_$DATE.sql

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete
```

### Log Rotation

Configure log rotation in `docker-compose.yml`:

```yaml
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
```

## Updating the Application

### Pull Latest Changes

```bash
git pull
docker-compose down
docker-compose pull
docker-compose up --build -d
```

### Zero-Downtime Deployment

For production, consider using:
- Docker Swarm
- Kubernetes
- Blue-green deployment strategy

## Support and Resources

- **Docker Documentation**: https://docs.docker.com/
- **Docker Compose Documentation**: https://docs.docker.com/compose/
- **PostgreSQL Documentation**: https://www.postgresql.org/docs/
- **Next.js Documentation**: https://nextjs.org/docs

## Summary

This Docker deployment provides:
- **Isolated Environment**: Containers separate app and database
- **Reproducible Builds**: Same environment everywhere
- **Easy Scaling**: Simple to scale horizontally
- **Data Persistence**: Volumes preserve database data
- **Quick Setup**: One command to start everything

For production deployments, ensure you:
- Use secure credentials
- Enable HTTPS
- Implement proper backup strategy
- Monitor application health
- Keep dependencies updated
