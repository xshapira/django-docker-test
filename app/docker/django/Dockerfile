FROM python:3.9.5-slim-buster

ARG APP_HOME=/usr/src/app
WORKDIR ${APP_HOME}

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt update \
    && apt install -y curl \
    && curl -sL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get -y install libpq-dev gcc \
    && pip install psycopg2 \
    && pip install psycopg2-binary \
    # cleaning up unused files
    && apt purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip \
  && pip install pipenv

COPY ./app/Pipfile ${APP_HOME}/Pipfile

RUN pipenv install --skip-lock --system --dev

RUN apt-get update && apt-get install -y libglu1

COPY ./app/docker/django/entrypoint ${APP_HOME}/docker/django/entrypoint

COPY ./app/docker/django/start_dev ${APP_HOME}/docker/django/start_dev
RUN sed -i 's/\r$//g' ${APP_HOME}/docker/django/start_dev
RUN chmod +x ${APP_HOME}/docker/django/start_dev

COPY . ${APP_HOME}/

ENTRYPOINT ["/usr/src/app/docker/django/entrypoint"]
