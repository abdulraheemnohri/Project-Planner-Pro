"""
AI Assistant Routes
"""

from fastapi import APIRouter
from typing import List

from app.services.ai_service import ai_service

router = APIRouter(prefix="/ai", tags=["ai"])


@router.post("/generate/issue-description")
async def generate_issue_description(title: str, context: str = ""):
    """Generate issue description using AI"""
    description = await ai_service.generate_issue_description(title, context)
    return {"description": description}


@router.post("/generate/release-notes")
async def generate_release_notes(changes: List[str]):
    """Generate release notes using AI"""
    release_notes = await ai_service.generate_release_notes(changes)
    return {"release_notes": release_notes}


@router.post("/summarize/commits")
async def summarize_commits(commit_messages: List[str]):
    """Summarize commit messages using AI"""
    summary = await ai_service.summarize_commits(commit_messages)
    return {"summary": summary}


@router.post("/explain/code")
async def explain_code(code: str, language: str = "python"):
    """Explain code using AI"""
    explanation = await ai_service.explain_code(code, language)
    return {"explanation": explanation}


@router.post("/find/bugs")
async def find_bugs(code: str, language: str = "python"):
    """Find potential bugs in code using AI"""
    bugs = await ai_service.find_bugs(code, language)
    return {"bugs": bugs}