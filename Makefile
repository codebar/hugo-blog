.PHONY: help build index serve check-links clean

# Default target
help:
	@echo "Available targets:"
	@echo "  build       - Build the Hugo site and index for search"
	@echo "  index       - Index built site with Pagefind"
	@echo "  serve       - Run Hugo development server with search indexing"
	@echo "  check-links - Run lychee link checker on content"
	@echo "  clean       - Remove build artifacts"

# Build the site
build:
	hugo --gc --minify
	$(MAKE) index

# Index the site with Pagefind
index:
	@echo "Indexing site with Pagefind..."
	npx pagefind --site public

# Run development server
# Note: In dev mode, search works after first manual index: make index
serve:
	hugo server --bind 0.0.0.0 --buildDrafts

# Run link checker
# Requires lychee to be installed: https://lychee.cli.rs/installation/
check-links:
	@lychee --config .lychee.toml --root-dir . 'content/**/*.md'

# Clean build artifacts
clean:
	rm -rf public/ resources/
