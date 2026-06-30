"""
Issue Model
"""

from sqlalchemy import Column, Integer, String, Text, ForeignKey, func
from sqlalchemy.orm import relationship
from app.database import Base


class Issue(Base):
    __tablename__ = "issues"

    id = Column(Integer, primary_key=True, index=True)
    number = Column(Integer, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    type = Column(String(20), default="task")
    status = Column(String(20), default="backlog")
    priority = Column(String(20), default="medium")
    story_points = Column(Integer)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False, index=True)
    sprint_id = Column(Integer, ForeignKey("sprints.id"), index=True)
    created_by_id = Column(Integer, ForeignKey("users.id"), index=True)
    assigned_to_id = Column(Integer, ForeignKey("users.id"), index=True)
    parent_issue_id = Column(Integer, ForeignKey("issues.id"), index=True)
    due_date = Column(Date)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    project = relationship("Project", back_populates="issues")
    sprint = relationship("Sprint", back_populates="issues")
    created_by = relationship("User", foreign_keys=[created_by_id], back_populates="issues")
    assigned_to = relationship("User", foreign_keys=[assigned_to_id], back_populates="assigned_issues")
    parent_issue = relationship("Issue", remote_side=[id], back_populates="sub_issues")
    sub_issues = relationship("Issue", back_populates="parent_issue")
    comments = relationship("Comment", back_populates="issue")
    attachments = relationship("Attachment", back_populates="issue")
    commits = relationship("Commit", back_populates="linked_issue")

    __table_args__ = (
        UniqueConstraint("project_id", "number", name="uq_project_issue_number"),
    )

    def __repr__(self):
        return f"<Issue(id={self.id}, title={self.title}, project_id={self.project_id})>"