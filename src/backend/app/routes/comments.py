"""
Comment Routes
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from app.database import get_db
from app.models.comment import Comment

router = APIRouter(prefix="/comments", tags=["comments"])


@router.get("/", response_model=List[Comment])
async def list_comments(db: AsyncSession = Depends(get_db)):
    """List all comments"""
    result = await db.execute(select(Comment))
    comments = result.scalars().all()
    return comments


@router.post("/", response_model=Comment, status_code=status.HTTP_201_CREATED)
async def create_comment(
    content: str,
    issue_id: int,
    db: AsyncSession = Depends(get_db)
):
    """Create a new comment"""
    comment = Comment(content=content, issue_id=issue_id, user_id=1)
    db.add(comment)
    await db.commit()
    await db.refresh(comment)
    return comment


@router.get("/{comment_id}", response_model=Comment)
async def get_comment(comment_id: int, db: AsyncSession = Depends(get_db)):
    """Get comment details"""
    result = await db.execute(select(Comment).where(Comment.id == comment_id))
    comment = result.scalars().first()
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found"
        )
    return comment