ENV ?= .env.dev
COMPOSE ?= compose.dev.yaml

# .PHONY: up down rebuild logs

# API - COMMANDS
up-api:
	docker compose --env-file ./backend/$(ENV) -f $(COMPOSE) up -d api

down-api:
	docker compose --env-file ./backend/$(ENV) -f $(COMPOSE) down api

rebuild-api:
	docker compose --env-file ./backend/$(ENV) -f $(COMPOSE) up -d --build api

logs:
	docker compose -f $(COMPOSE) logs -f
