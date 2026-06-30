"""
Milestone Routes
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from datetime import date

from app.database import get_db
from app.models.milestone import Milestone

router = APIRouter(prefix="/milestones", tags=["milestones"])


@router.get("/", response_model=List[Milestone])
async def list_milestones(db: AsyncSession = Depends(get_db)):
    """List all milestones"""
    result = await db.execute(select(Milestone))
    milestones = result.scalars().all()
    return milestones


@router.post("/", response_model=Milestone, status_code=status.HTTP_201_CREATED)
async def create_milestone(
    name: str,
    description: str = "",
    target_date: str = None,
    project_id: int = None,
    db: AsyncSession = Depends(get_db)
):
    """Create a new milestone"""
    milestone = Milestone(
        name=name,
        description=description,
        target_date=date.fromisoformat(target_date) if target_date else None,
        status="planned",
        progress=0,
        project_id=project_id
    )
    db.add(milestone)
    await db.commit()
    await db.refresh(milestone)
    return milestone


@router.get("/{milestone_id}", response_model=Milestone)
async def get_milestone(milestone_id: int, db: AsyncSession = Depends(get_db)):
    """Get milestone details"""
    result = await db.execute(select(Milestone).where(Milestone.id == milestone_id))
    milestone = result.scalars().first()
    if not milestone:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Milestone not found"
        )
    return milestone