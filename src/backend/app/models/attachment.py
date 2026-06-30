"""
Attachment Model
"""

from sqlalchemy import Column, Integer, String, ForeignKey, func
from sqlalchemy.orm import relationship
from sqlalchemy.sql import DateTime
from app.database import Base


class Attachment(Base):
    __tablename__ = "attachments"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    original_name = Column(String(255), nullable=False)
    mime_type = Column(String(100), nullable=False)
    size = Column(Integer, nullable=False)
    path = Column(String(500), nullable=False)
    issue_id = Column(Integer, ForeignKey("issues.id"), index=True)
    comment_id = Column(Integer, ForeignKey("comments.id"), index=True)
    uploaded_by_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    issue = relationship("Issue", back_populates="attachments")
    comment = relationship("Comment", back_populates="attachments")
    uploaded_by = relationship("User")

    def __repr__(self):
        return f"<Attachment(id={self.id}, filename={self.filename})>"