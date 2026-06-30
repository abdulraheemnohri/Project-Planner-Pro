# Deployment Guide - Project Planner Pro

## Deployment Options

### Option 1: Docker Compose (Recommended)

#### Prerequisites
- Docker
- Docker Compose

#### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/abdulraheemnohri/Project-Planner-Pro.git
   cd Project-Planner-Pro
   ```

2. Create .env file:
   ```bash
   cp src/backend/.env.example src/backend/.env
   ```

3. Edit .env with your configuration

4. Run database migrations:
   ```bash
   cd src/backend
   alembic upgrade head
   cd ../..
   ```

5. Start services:
   ```bash
   docker-compose up -d
   ```

---

### Option 2: Vercel (Frontend) + Railway (Backend)

#### Frontend on Vercel
1. Install Vercel CLI: npm install -g vercel
2. Deploy: vercel --prod

#### Backend on Railway
1. Sign up for Railway: https://railway.app
2. Create new project
3. Import GitHub repository
4. Configure PostgreSQL and Redis
5. Set environment variables
6. Deploy

---

### Option 3: Railway (Full Stack)
1. Sign up for Railway: https://railway.app
2. Create new project
3. Import GitHub repository
4. Configure services (frontend, backend, database, redis)
5. Set environment variables
6. Deploy

---

## Environment Variables

### Required
- DATABASE_URL: PostgreSQL connection URL
- SECRET_KEY: JWT secret key
- REDIS_URL: Redis connection URL

### Optional
- DEBUG: Enable debug mode
- APP_NAME: Application name
- APP_VERSION: Application version
- CORS_ORIGINS: Allowed CORS origins
- GITHUB_CLIENT_ID: GitHub OAuth client ID
- GITHUB_CLIENT_SECRET: GitHub OAuth client secret

---

## Production Configuration

### Database
- Use managed PostgreSQL service
- Set proper connection pooling
- Enable backups

### Security
- Use HTTPS
- Set strong SECRET_KEY
- Enable rate limiting
- Use proper CORS settings

---

## Monitoring
- Track API response times
- Monitor database queries
- Track error rates
- Monitor resource usage

---

## Troubleshooting

### Common Issues
1. Database connection errors - Check DATABASE_URL
2. CORS errors - Verify CORS_ORIGINS
3. Migration errors - Run alembic upgrade head
4. Dependency errors - Run npm install / pip install -r requirements.txt

---

## Support
For deployment issues, please check logs, verify environment variables, and check network connectivity.