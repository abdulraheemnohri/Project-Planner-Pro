"""
Milestone Model
"""

from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey, func
from sqlalchemy.orm import relationship
from sqlalchemy.sql import DateTime
from app.database import Base


class Milestone(Base):
    __tablename__ = "milestones"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    target_date = Column(Date)
    status = Column(String(20), default="planned")
    progress = Column(Integer, default=0)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False, index=True)
    created_by_id = Column(Integer, ForeignKey("users.id"), index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    project = relationship("Project", back_populates="milestones")
    created_by = relationship("User")
    tasks = relationship("MilestoneTask", back_populates="milestone")

    def __repr__(self):
        return f"<Milestone(id={self.id}, name={self.name}, project_id={self.project_id})>"