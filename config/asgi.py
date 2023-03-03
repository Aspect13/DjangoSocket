"""
ASGI config for DjangoSocket project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
# from gevent.pywsgi import WSGIServer
# from geventwebsocket.handler import WebSocketHandler
from socketio import ASGIApp

from socket_io.views import sio

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# sio = AsyncServer(async_mode='asgi')
application = ASGIApp(sio, get_asgi_application())



# server = pywsgi.WSGIServer(('', 8000), application, handler_class=WebSocketHandler)
# server = WSGIServer(('', 8000), application, handler_class=WebSocketHandler)
# server = ASGIServer(('', 8000), application, handler_class=WebSocketHandler)
# server.serve_forever()
