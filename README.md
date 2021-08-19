# django-tailwind-docker
Django project template that uses Tailwind CSS, Gulp, and Docker.

### Useful commands
```docker
cd app && npm ci && npm cache clean --force

docker-compose up --build
docker-compose exec django ./manage.py createsuperuser
docker compose exec django ./manage.py startapp <name_of_app>
docker-compose exec django pipenv install <name_of_package>

docker-compose -f docker-compose.prod.yml up -d --build
```

### Keywords to CHANGE in every new project
```
webapp
example.com
@example.com
```

### TODO

- [ ] Write something to do...
