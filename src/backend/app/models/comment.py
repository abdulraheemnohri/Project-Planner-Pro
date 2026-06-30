"""
Comment Model
"""

from sqlalchemy import Column, Integer, Text, ForeignKey, func
from sqlalchemy.orm import relationship
from sqlalchemy.sql import DateTime
from app.database import Base


class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    issue_id = Column(Integer, ForeignKey("issues.id"), nullable=False, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    issue = relationship("Issue", back_populates="comments")
    user = relationship("User", back_populates="comments")
    attachments = relationship("Attachment", back_populates="comment")

    def __repr__(self):
        return f"<Comment(id={self.id}, issue_id={self.issue_id}, user_id={self.user_id})>"