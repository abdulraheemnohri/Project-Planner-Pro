"""
Project Model
"""

from sqlalchemy import Column, Integer, String, Text, Date, func
from sqlalchemy.orm import relationship
from app.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    key = Column(String(10), unique=True, nullable=False, index=True)
    status = Column(String(20), default="active")
    start_date = Column(Date)
    end_date = Column(Date)
    created_by_id = Column(Integer, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    created_by = relationship("User", back_populates="projects")
    sprints = relationship("Sprint", back_populates="project")
    issues = relationship("Issue", back_populates="project")
    milestones = relationship("Milestone", back_populates="project")
    git_repositories = relationship("GitRepository", back_populates="project")
    releases = relationship("Release", back_populates="project")

    def __repr__(self):
        return f"<Project(id={self.id}, name={self.name}, key={self.key})>"