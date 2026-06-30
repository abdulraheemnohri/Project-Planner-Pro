"""
WebSocket Configuration for Real-time Updates
"""

from fastapi import WebSocket, WebSocketDisconnect
from fastapi.websockets import WebSocketState
import json
from typing import Dict, Set

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, Set[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, room: str):
        await websocket.accept()
        if room not in self.active_connections:
            self.active_connections[room] = set()
        self.active_connections[room].add(websocket)

    def disconnect(self, websocket: WebSocket, room: str):
        if room in self.active_connections:
            self.active_connections[room].discard(websocket)
            if not self.active_connections[room]:
                del self.active_connections[room]

    async def broadcast(self, message: dict, room: str):
        if room in self.active_connections:
            for connection in self.active_connections[room]:
                if connection.client_state == WebSocketState.CONNECTED:
                    await connection.send_text(json.dumps(message))

manager = ConnectionManager()