"""
Release Model
"""

from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.database import Base


class Release(Base):
    __tablename__ = "releases"

    id = Column(Integer, primary_key=True, index=True)
    version = Column(String(50), nullable=False)
    name = Column(String(100))
    description = Column(Text)
    changelog = Column(Text)
    status = Column(String(20), default="draft")
    published_at = Column(DateTime(timezone=True))
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False, index=True)
    created_by_id = Column(Integer, ForeignKey("users.id"), index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    project = relationship("Project", back_populates="releases")
    created_by = relationship("User")

    def __repr__(self):
        return f"<Release(id={self.id}, version={self.version}, project_id={self.project_id})>"