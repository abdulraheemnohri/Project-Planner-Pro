"""
Sprint Routes
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from datetime import date, timedelta

from app.database import get_db
from app.models.sprint import Sprint

router = APIRouter(prefix="/sprints", tags=["sprints"])


@router.get("/", response_model=List[Sprint])
async def list_sprints(db: AsyncSession = Depends(get_db)):
    """List all sprints"""
    result = await db.execute(select(Sprint))
    sprints = result.scalars().all()
    return sprints


@router.post("/", response_model=Sprint, status_code=status.HTTP_201_CREATED)
async def create_sprint(
    name: str,
    goal: str = "",
    project_id: int = None,
    duration_days: int = 14,
    db: AsyncSession = Depends(get_db)
):
    """Create a new sprint"""
    start_date = date.today()
    end_date = start_date + timedelta(days=duration_days)
    
    sprint = Sprint(
        name=name,
        goal=goal,
        status="planned",
        start_date=start_date,
        end_date=end_date,
        project_id=project_id
    )
    db.add(sprint)
    await db.commit()
    await db.refresh(sprint)
    return sprint