"""
Git Repository Model
"""

from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey, func
from sqlalchemy.orm import relationship
from sqlalchemy.sql import DateTime
from app.database import Base


class GitRepository(Base):
    __tablename__ = "git_repositories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    url = Column(String(500), nullable=False)
    provider = Column(String(20), nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False, index=True)
    access_token = Column(Text)
    is_connected = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    project = relationship("Project", back_populates="git_repositories")
    commits = relationship("Commit", back_populates="repository")
    pull_requests = relationship("PullRequest", back_populates="repository")

    def __repr__(self):
        return f"<GitRepository(id={self.id}, name={self.name}, project_id={self.project_id})>"