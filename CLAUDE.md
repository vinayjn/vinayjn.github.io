# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based personal blog hosted on GitHub Pages. The blog uses the Minima theme and includes custom features for bookshelf management and post publishing.

## Key Commands

### Development and Building
- `bundle exec jekyll build` - Build the Jekyll site (production build when JEKYLL_ENV=production)
- `bundle exec jekyll serve` - Start local development server
- `make publish` - Build and deploy the site to GitHub Pages (runs scripts/publish.sh)
- `make bookshelf` - Generate bookshelf page from ISBN data using custom shelf tool

### Publishing Workflow
- `./publish_post.sh <draft_path> <destination_path>` - Move draft to posts and publish
- `./scripts/publish.sh` - Full publish workflow: build site, clone target repo, copy files, commit and push

## Architecture

### Jekyll Configuration
- Uses Minima theme with custom modifications
- Permalink structure: `posts/:slug`
- Markdown processor: Kramdown with GFM input
- Plugins: feed, SEO tag, sitemap, minifier, Twitter plugin
- Sass compilation with compressed output

### Directory Structure
- `_posts/` - Published blog posts in Markdown format
- `_layouts/` - Custom Jekyll layouts (default, post, page, mermaid variants)
- `_includes/` - Reusable template components
- `_sass/` - Sass stylesheets and theme customization
- `images/` - Static images organized by post/feature
- `scripts/` - Custom tools for bookshelf generation and publishing
- `_site/` - Generated site output (excluded from git)

### Custom Features
- **Bookshelf Management**: Custom Go-based tool (`scripts/Shelf`) generates book pages from ISBN data
- **Publication System**: Automated workflow publishes to separate GitHub Pages repository
- **Mermaid Support**: Custom layouts for diagram rendering
- **Social Integration**: Twitter plugin and social link management

### Publishing Process
1. Draft posts created anywhere in filesystem
2. `publish_post.sh` moves draft to `_posts/` with proper naming
3. `make publish` triggers full build and deployment
4. Site built with `JEKYLL_ENV=production`
5. Generated site copied to separate GitHub Pages repo and pushed
6. Source changes committed to private repo

## Development Notes

- Ruby version managed via rbenv (configured for 3.1.2)
- Site excludes: minima.gemspec, scripts, Shelf, Makefile, web-builder
- Custom date formats configured for mini and full displays
- Disqus comments integration available
- SEO optimization through jekyll-seo-tag plugin