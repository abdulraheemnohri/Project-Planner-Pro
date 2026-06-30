"""
Release Routes
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from app.database import get_db
from app.models.release import Release

router = APIRouter(prefix="/releases", tags=["releases"])


@router.get("/", response_model=List[Release])
async def list_releases(db: AsyncSession = Depends(get_db)):
    """List all releases"""
    result = await db.execute(select(Release))
    releases = result.scalars().all()
    return releases


@router.post("/", response_model=Release, status_code=status.HTTP_201_CREATED)
async def create_release(
    version: str,
    name: str = "",
    description: str = "",
    changelog: str = "",
    project_id: int = None,
    db: AsyncSession = Depends(get_db)
):
    """Create a new release"""
    release = Release(
        version=version,
        name=name,
        description=description,
        changelog=changelog,
        status="draft",
        project_id=project_id
    )
    db.add(release)
    await db.commit()
    await db.refresh(release)
    return release


@router.get("/{release_id}", response_model=Release)
async def get_release(release_id: int, db: AsyncSession = Depends(get_db)):
    """Get release details"""
    result = await db.execute(select(Release).where(Release.id == release_id))
    release = result.scalars().first()
    if not release:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Release not found"
        )
    return release