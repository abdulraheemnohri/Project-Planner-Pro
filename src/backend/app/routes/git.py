"""
Git Integration Routes
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from app.database import get_db
from app.models.git_repository import GitRepository
from app.models.commit import Commit

router = APIRouter(prefix="/git", tags=["git"])


@router.get("/repositories", response_model=List[GitRepository])
async def list_repositories(db: AsyncSession = Depends(get_db)):
    """List all connected Git repositories"""
    result = await db.execute(select(GitRepository))
    repositories = result.scalars().all()
    return repositories


@router.post("/repositories", response_model=GitRepository, status_code=status.HTTP_201_CREATED)
async def connect_repository(
    name: str,
    url: str,
    provider: str = "github",
    project_id: int = None,
    db: AsyncSession = Depends(get_db)
):
    """Connect a Git repository"""
    repository = GitRepository(
        name=name,
        url=url,
        provider=provider,
        project_id=project_id,
        is_connected=True
    )
    db.add(repository)
    await db.commit()
    await db.refresh(repository)
    return repository


@router.get("/repositories/{repo_id}/commits", response_model=List[Commit])
async def list_commits(repo_id: int, db: AsyncSession = Depends(get_db)):
    """List commits for a repository"""
    result = await db.execute(select(Commit).where(Commit.repository_id == repo_id))
    commits = result.scalars().all()
    return commits


@router.get("/repositories/{repo_id}", response_model=GitRepository)
async def get_repository(repo_id: int, db: AsyncSession = Depends(get_db)):
    """Get repository details"""
    result = await db.execute(select(GitRepository).where(GitRepository.id == repo_id))
    repository = result.scalars().first()
    if not repository:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Repository not found"
        )
    return repository