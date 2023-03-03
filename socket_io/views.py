import asyncio
from datetime import datetime

from socketio import AsyncServer

import os

from django.http import HttpResponse
import socketio

sio = AsyncServer(async_mode='asgi', cors_allowed_origins='*', cors_credentials=False, always_connect=True, logger=True)


@sio.event
async def ping(sid, message):
    print('ping received', sid, message)
    await sio.emit('pong', {'room': sid, 'message': 'pong ' + message}, room=sid)


@sio.event
async def enter_chat(sid, message):
    sio.enter_room(sid, message['room'])
    payload = {
        'message': '--Entered The Chat--',
        'user': message["user"],
        'timestamp': datetime.utcnow().isoformat()
    }
    await sio.emit('chat', payload, to='my_awesome_chat_room')


@sio.event
async def chat(sid, message):
    print('Chat message', message)
    message['timestamp'] = datetime.utcnow().isoformat()
    await sio.emit('chat', message, to='my_awesome_chat_room')


@sio.event
async def connect(sid, environ):
    print(f"{sid}\t connected")


@sio.event
async def disconnect(sid):
    print(f"{sid}\t {users[sid]} disconnected")
