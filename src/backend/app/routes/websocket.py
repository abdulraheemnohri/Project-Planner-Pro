"""
WebSocket Routes for Real-time Updates
"""

from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from fastapi.websockets import WebSocketState

from app.websocket import manager

router = APIRouter(prefix="/ws", tags=["websocket"])


@router.websocket("/notifications")
async def websocket_notifications(websocket: WebSocket):
    """WebSocket endpoint for real-time notifications"""
    await manager.connect(websocket, "notifications")
    try:
        while True:
            data = await websocket.receive_text()
            # Handle incoming messages if needed
    except WebSocketDisconnect:
        manager.disconnect(websocket, "notifications")


@router.websocket("/project/{project_id}")
async def websocket_project(websocket: WebSocket, project_id: str):
    """WebSocket endpoint for project-specific updates"""
    room = f"project_{project_id}"
    await manager.connect(websocket, room)
    try:
        while True:
            data = await websocket.receive_text()
            # Handle project-specific messages
    except WebSocketDisconnect:
        manager.disconnect(websocket, room)