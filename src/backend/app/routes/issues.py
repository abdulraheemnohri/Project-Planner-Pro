"""
Issue Routes
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from app.database import get_db
from app.models.issue import Issue

router = APIRouter(prefix="/issues", tags=["issues"])


@router.get("/", response_model=List[Issue])
async def list_issues(db: AsyncSession = Depends(get_db)):
    """List all issues"""
    result = await db.execute(select(Issue))
    issues = result.scalars().all()
    return issues


@router.post("/", response_model=Issue, status_code=status.HTTP_201_CREATED)
async def create_issue(
    title: str,
    description: str = "",
    type: str = "task",
    priority: str = "medium",
    project_id: int = None,
    sprint_id: int = None,
    db: AsyncSession = Depends(get_db)
):
    """Create a new issue"""
    # Get next issue number for project
    if project_id:
        result = await db.execute(
            select(Issue).where(Issue.project_id == project_id).order_by(Issue.number.desc())
        )
        last_issue = result.scalars().first()
        number = (last_issue.number if last_issue else 0) + 1
    else:
        number = 1
    
    issue = Issue(
        title=title,
        description=description,
        type=type,
        priority=priority,
        number=number,
        status="backlog",
        project_id=project_id,
        sprint_id=sprint_id
    )
    db.add(issue)
    await db.commit()
    await db.refresh(issue)
    return issue