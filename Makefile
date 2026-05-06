.PHONY: help build serve check-links clean

# Default target
help:
	@echo "Available targets:"
	@echo "  build       - Build the Hugo site"
	@echo "  serve       - Run Hugo development server"
	@echo "  check-links - Run lychee link checker on content"
	@echo "  clean       - Remove build artifacts"

# Build the site
build:
	hugo --gc --minify

# Run development server
serve:
	hugo server --bind 0.0.0.0 --buildDrafts

# Run link checker
# Requires lychee to be installed: https://lychee.cli.rs/installation/
check-links:
	@lychee --config .lychee.toml --root-dir . 'content/**/*.md'

# Clean build artifacts
clean:
	rm -rf public/
