# Add these lines to the existing Makefile

# Caddy Commands
.PHONY: caddy-reload
caddy-reload: ## Reload Caddy configuration
	@echo "$(CYAN)Reloading Caddy configuration...$(RESET)"
	@docker-compose exec caddy caddy reload

.PHONY: caddy-logs
caddy-logs: ## View Caddy logs
	@echo "$(CYAN)Viewing Caddy logs...$(RESET)"
	@docker-compose logs -f caddy