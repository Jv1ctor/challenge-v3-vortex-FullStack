ENV ?= .env.dev
COMPOSE ?= compose.dev.yaml

# .PHONY: up down rebuild logs

# API - COMMANDS
up-api:
	docker compose --env-file ./backend/$(ENV) -f $(COMPOSE) up -d api

down-api:
	docker compose --env-file ./backend/$(ENV) -f $(COMPOSE) down api

down-db:
	docker compose --env-file ./backend/$(ENV) -f $(COMPOSE) down db

rebuild-api:
	docker compose --env-file ./backend/$(ENV) -f $(COMPOSE) up -d --build api

logs:
	docker compose -f $(COMPOSE) logs -f

exec-seed:
	docker compose --env-file ./backend/$(ENV) -f $(COMPOSE) exec api npm run seed


# WEB - COMMANDS

up-web:
	docker compose --env-file ./frontend/$(ENV) -f $(COMPOSE) up -d web

down-web:
	docker compose --env-file ./frontend/$(ENV) -f $(COMPOSE) down web

rebuild-web:
	docker compose --env-file ./frontend/$(ENV) -f $(COMPOSE) up -d --build web