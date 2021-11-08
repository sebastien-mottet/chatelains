# pull official base image
FROM python:3.8-slim-buster

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV FLASK_APP=api
ENV FLASK_RUN_HOST=0.0.0.0

# Create app directory
RUN mkdir /code
WORKDIR /code
# Copy project
COPY . /code/

# install dependencies
RUN pip install --upgrade pip
RUN apt-get update && apt-get install -y libpq-dev gcc
RUN apt-get install -y procps
RUN apt install -y netcat
RUN pip install psycopg2-binary
RUN pip install -r requirements.txt

# run entrypoint.sh
ENTRYPOINT ["/code/entrypoint.sh"]