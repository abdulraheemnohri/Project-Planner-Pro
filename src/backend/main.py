"""
Project Planner Pro - Backend API
FastAPI Application
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routes import (
    auth,
    users,
    projects,
    sprints,
    issues,
    comments,
    milestones,
    releases,
    git,
    websocket,
)

# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    description=settings.APP_DESCRIPTION,
    version=settings.APP_VERSION,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(projects.router, prefix="/api/projects", tags=["projects"])
app.include_router(sprints.router, prefix="/api/sprints", tags=["sprints"])
app.include_router(issues.router, prefix="/api/issues", tags=["issues"])
app.include_router(comments.router, prefix="/api/comments", tags=["comments"])
app.include_router(milestones.router, prefix="/api/milestones", tags=["milestones"])
app.include_router(releases.router, prefix="/api/releases", tags=["releases"])
app.include_router(git.router, prefix="/api/git", tags=["git"])
app.include_router(websocket.router, prefix="/ws", tags=["websocket"])


# Root endpoint
@app.get("/")
async def root():
    """Root endpoint - API status check"""
    return {
        "name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "description": settings.APP_DESCRIPTION,
        "docs": "/api/docs",
        "status": "running",
    }


# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "healthy",
        "version": settings.APP_VERSION,
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
    )