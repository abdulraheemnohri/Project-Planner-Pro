"""
Commit Model
"""

from sqlalchemy import Column, Integer, String, Text, ForeignKey, func
from sqlalchemy.orm import relationship
from sqlalchemy.sql import DateTime
from app.database import Base


class Commit(Base):
    __tablename__ = "commits"

    id = Column(Integer, primary_key=True, index=True)
    hash = Column(String(40), nullable=False, index=True)
    message = Column(Text, nullable=False)
    author_name = Column(String(100), nullable=False)
    author_email = Column(String(255), nullable=False)
    commit_date = Column(DateTime(timezone=True), nullable=False)
    repository_id = Column(Integer, ForeignKey("git_repositories.id"), nullable=False, index=True)
    linked_issue_id = Column(Integer, ForeignKey("issues.id"), index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    repository = relationship("GitRepository", back_populates="commits")
    linked_issue = relationship("Issue", back_populates="commits")

    def __repr__(self):
        return f"<Commit(id={self.id}, hash={self.hash}, repository_id={self.repository_id})>"