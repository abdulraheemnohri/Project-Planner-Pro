"""
User Routes
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from app.database import get_db
from app.models.user import User

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/", response_model=List[User])
async def list_users(db: AsyncSession = Depends(get_db)):
    """List all users"""
    result = await db.execute(select(User))
    users = result.scalars().all()
    return users


@router.get("/me")
async def get_current_user(db: AsyncSession = Depends(get_db)):
    """Get current user details"""
    # This will be updated with authentication
    result = await db.execute(select(User).limit(1))
    user = result.scalars().first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user