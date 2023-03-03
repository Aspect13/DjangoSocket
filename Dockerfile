FROM python:3.11-alpine

# Install dependencies required for python
RUN apk update && apk add libpq
RUN apk add --virtual .build-deps gcc python3-dev py3-setuptools libffi-dev openssl-dev cargo build-base linux-headers libxml2-dev libc-dev libxslt-dev unixodbc-dev ldb-dev curl mc bash

RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . .

RUN python -m pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000
