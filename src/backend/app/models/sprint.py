"""
Sprint Model
"""

from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey, func
from sqlalchemy.orm import relationship
from sqlalchemy.sql import DateTime
from app.database import Base


class Sprint(Base):
    __tablename__ = "sprints"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    goal = Column(Text)
    status = Column(String(20), default="planned")
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False, index=True)
    created_by_id = Column(Integer, ForeignKey("users.id"), index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    project = relationship("Project", back_populates="sprints")
    created_by = relationship("User", back_populates="sprints")
    issues = relationship("Issue", back_populates="sprint")

    def __repr__(self):
        return f"<Sprint(id={self.id}, name={self.name}, project_id={self.project_id})>"