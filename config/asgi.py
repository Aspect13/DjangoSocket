"""
ASGI config for DjangoSocket project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from socketio import ASGIApp

from socket_io.sio import sio

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

application = ASGIApp(sio, get_asgi_application())

