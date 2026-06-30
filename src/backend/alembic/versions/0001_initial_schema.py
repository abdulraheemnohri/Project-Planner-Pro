"""Initial schema

Revision ID: 0001
Revises:
Create Date: 2026-06-30 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

revision = "0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # Users table
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), nullable=False, primary_key=True),
        sa.Column("username", sa.String(length=50), nullable=False, unique=True),
        sa.Column("email", sa.String(length=255), nullable=False, unique=True),
        sa.Column("password_hash", sa.String(length=255), nullable=False),
        sa.Column("full_name", sa.String(length=100)),
        sa.Column("avatar_url", sa.String(length=500)),
        sa.Column("role", sa.String(length=20), nullable=False, server_default="developer"),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
    )
    op.create_index(op.f("ix_users_username"), "users", ["username"], unique=True)
    op.create_index(op.f("ix_users_email"), "users", ["email"], unique=True)

    # Projects table
    op.create_table(
        "projects",
        sa.Column("id", sa.Integer(), nullable=False, primary_key=True),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("description", sa.Text()),
        sa.Column("key", sa.String(length=10), nullable=False, unique=True),
        sa.Column("status", sa.String(length=20), nullable=False, server_default="active"),
        sa.Column("start_date", sa.Date()),
        sa.Column("end_date", sa.Date()),
        sa.Column("created_by_id", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
    )
    op.create_index(op.f("ix_projects_key"), "projects", ["key"], unique=True)
    op.create_index(op.f("ix_projects_created_by_id"), "projects", ["created_by_id"])

    # Sprints table
    op.create_table(
        "sprints",
        sa.Column("id", sa.Integer(), nullable=False, primary_key=True),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("description", sa.Text()),
        sa.Column("goal", sa.Text()),
        sa.Column("status", sa.String(length=20), nullable=False, server_default="planned"),
        sa.Column("start_date", sa.Date(), nullable=False),
        sa.Column("end_date", sa.Date(), nullable=False),
        sa.Column("project_id", sa.Integer(), nullable=False),
        sa.Column("created_by_id", sa.Integer()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
    )
    op.create_index(op.f("ix_sprints_project_id"), "sprints", ["project_id"])
    op.create_index(op.f("ix_sprints_created_by_id"), "sprints", ["created_by_id"])

    # Issues table
    op.create_table(
        "issues",
        sa.Column("id", sa.Integer(), nullable=False, primary_key=True),
        sa.Column("number", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("description", sa.Text()),
        sa.Column("type", sa.String(length=20), nullable=False, server_default="task"),
        sa.Column("status", sa.String(length=20), nullable=False, server_default="backlog"),
        sa.Column("priority", sa.String(length=20), nullable=False, server_default="medium"),
        sa.Column("story_points", sa.Integer()),
        sa.Column("project_id", sa.Integer(), nullable=False),
        sa.Column("sprint_id", sa.Integer()),
        sa.Column("created_by_id", sa.Integer()),
        sa.Column("assigned_to_id", sa.Integer()),
        sa.Column("parent_issue_id", sa.Integer()),
        sa.Column("due_date", sa.Date()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
    )
    op.create_index(op.f("ix_issues_project_id"), "issues", ["project_id"])
    op.create_index(op.f("ix_issues_sprint_id"), "issues", ["sprint_id"])
    op.create_index(op.f("ix_issues_created_by_id"), "issues", ["created_by_id"])
    op.create_index(op.f("ix_issues_assigned_to_id"), "issues", ["assigned_to_id"])
    op.create_index(op.f("ix_issues_parent_issue_id"), "issues", ["parent_issue_id"])
    op.create_unique_constraint(op.f("uq_project_issue_number"), "issues", ["project_id", "number"])

    # Comments table
    op.create_table(
        "comments",
        sa.Column("id", sa.Integer(), nullable=False, primary_key=True),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("issue_id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
    )
    op.create_index(op.f("ix_comments_issue_id"), "comments", ["issue_id"])
    op.create_index(op.f("ix_comments_user_id"), "comments", ["user_id"])

    # Attachments table
    op.create_table(
        "attachments",
        sa.Column("id", sa.Integer(), nullable=False, primary_key=True),
        sa.Column("filename", sa.String(length=255), nullable=False),
        sa.Column("original_name", sa.String(length=255), nullable=False),
        sa.Column("mime_type", sa.String(length=100), nullable=False),
        sa.Column("size", sa.Integer(), nullable=False),
        sa.Column("path", sa.String(length=500), nullable=False),
        sa.Column("issue_id", sa.Integer()),
        sa.Column("comment_id", sa.Integer()),
        sa.Column("uploaded_by_id", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
    )
    op.create_index(op.f("ix_attachments_issue_id"), "attachments", ["issue_id"])
    op.create_index(op.f("ix_attachments_comment_id"), "attachments", ["comment_id"])

    # Milestones table
    op.create_table(
        "milestones",
        sa.Column("id", sa.Integer(), nullable=False, primary_key=True),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("description", sa.Text()),
        sa.Column("target_date", sa.Date()),
        sa.Column("status", sa.String(length=20), nullable=False, server_default="planned"),
        sa.Column("progress", sa.Integer(), nullable=False, server_default=0),
        sa.Column("project_id", sa.Integer(), nullable=False),
        sa.Column("created_by_id", sa.Integer()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
    )
    op.create_index(op.f("ix_milestones_project_id"), "milestones", ["project_id"])

    # Releases table
    op.create_table(
        "releases",
        sa.Column("id", sa.Integer(), nullable=False, primary_key=True),
        sa.Column("version", sa.String(length=50), nullable=False),
        sa.Column("name", sa.String(length=100)),
        sa.Column("description", sa.Text()),
        sa.Column("changelog", sa.Text()),
        sa.Column("status", sa.String(length=20), nullable=False, server_default="draft"),
        sa.Column("published_at", sa.DateTime(timezone=True)),
        sa.Column("project_id", sa.Integer(), nullable=False),
        sa.Column("created_by_id", sa.Integer()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
    )
    op.create_index(op.f("ix_releases_project_id"), "releases", ["project_id"])

    # Git Repositories table
    op.create_table(
        "git_repositories",
        sa.Column("id", sa.Integer(), nullable=False, primary_key=True),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("url", sa.String(length=500), nullable=False),
        sa.Column("provider", sa.String(length=20), nullable=False),
        sa.Column("project_id", sa.Integer(), nullable=False),
        sa.Column("access_token", sa.Text()),
        sa.Column("is_connected", sa.Boolean(), nullable=False, server_default=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
    )
    op.create_index(op.f("ix_git_repositories_project_id"), "git_repositories", ["project_id"])

    # Commits table
    op.create_table(
        "commits",
        sa.Column("id", sa.Integer(), nullable=False, primary_key=True),
        sa.Column("hash", sa.String(length=40), nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("author_name", sa.String(length=100), nullable=False),
        sa.Column("author_email", sa.String(length=255), nullable=False),
        sa.Column("commit_date", sa.DateTime(timezone=True), nullable=False),
        sa.Column("repository_id", sa.Integer(), nullable=False),
        sa.Column("linked_issue_id", sa.Integer()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
    )
    op.create_index(op.f("ix_commits_hash"), "commits", ["hash"])
    op.create_index(op.f("ix_commits_repository_id"), "commits", ["repository_id"])
    op.create_index(op.f("ix_commits_linked_issue_id"), "commits", ["linked_issue_id"])

    # Add foreign keys
    op.add_column("projects", sa.Column("created_by_id_fk", sa.Integer(), nullable=True))
    op.create_foreign_key(
        op.f("fk_projects_created_by"),
        "projects",
        "users",
        ["created_by_id"],
        ["id"],
    )
    
    op.create_foreign_key(
        op.f("fk_sprints_project"),
        "sprints",
        "projects",
        ["project_id"],
        ["id"],
    )
    
    op.create_foreign_key(
        op.f("fk_sprints_created_by"),
        "sprints",
        "users",
        ["created_by_id"],
        ["id"],
    )
    
    op.create_foreign_key(
        op.f("fk_issues_project"),
        "issues",
        "projects",
        ["project_id"],
        ["id"],
    )
    
    op.create_foreign_key(
        op.f("fk_issues_sprint"),
        "issues",
        "sprints",
        ["sprint_id"],
        ["id"],
    )
    
    op.create_foreign_key(
        op.f("fk_issues_created_by"),
        "issues",
        "users",
        ["created_by_id"],
        ["id"],
    )
    
    op.create_foreign_key(
        op.f("fk_issues_assigned_to"),
        "issues",
        "users",
        ["assigned_to_id"],
        ["id"],
    )
    
    op.create_foreign_key(
        op.f("fk_issues_parent"),
        "issues",
        "issues",
        ["parent_issue_id"],
        ["id"],
    )
    
    op.create_foreign_key(
        op.f("fk_comments_issue"),
        "comments",
        "issues",
        ["issue_id"],
        ["id"],
    )
    
    op.create_foreign_key(
        op.f("fk_comments_user"),
        "comments",
        "users",
        ["user_id"],
        ["id"],
    )
    
    op.create_foreign_key(
        op.f("fk_attachments_issue"),
        "attachments",
        "issues",
        ["issue_id"],
        ["id"],
    )
    
    op.create_foreign_key(
        op.f("fk_attachments_comment"),
        "attachments",
        "comments",
        ["comment_id"],
        ["id"],
    )
    
    op.create_foreign_key(
        op.f("fk_attachments_uploaded_by"),
        "attachments",
        "users",
        ["uploaded_by_id"],
        ["id"],
    )
    
    op.create_foreign_key(
        op.f("fk_milestones_project"),
        "milestones",
        "projects",
        ["project_id"],
        ["id"],
    )
    
    op.create_foreign_key(
        op.f("fk_releases_project"),
        "releases",
        "projects",
        ["project_id"],
        ["id"],
    )
    
    op.create_foreign_key(
        op.f("fk_git_repositories_project"),
        "git_repositories",
        "projects",
        ["project_id"],
        ["id"],
    )
    
    op.create_foreign_key(
        op.f("fk_commits_repository"),
        "commits",
        "git_repositories",
        ["repository_id"],
        ["id"],
    )
    
    op.create_foreign_key(
        op.f("fk_commits_linked_issue"),
        "commits",
        "issues",
        ["linked_issue_id"],
        ["id"],
    )


def downgrade():
    op.drop_table("commits")
    op.drop_table("git_repositories")
    op.drop_table("releases")
    op.drop_table("milestones")
    op.drop_table("attachments")
    op.drop_table("comments")
    op.drop_table("issues")
    op.drop_table("sprints")
    op.drop_table("projects")
    op.drop_table("users")