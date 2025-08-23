# ElettrocarNew.md

## Overview

This is a cloned version of the Elettrocar application with a separate database instance. ElettrocarNew is a full-stack web application built with a React frontend and Express.js backend, providing the same automotive service center functionality as the original Elettrocar with independent data storage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows the same monorepo structure as the original with clear separation between client and server code:

- **Frontend**: React SPA with TypeScript, built with Vite
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (separate instance using DATABASE_URL_NEW)
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: TailwindCSS with CSS custom properties for theming
- **Routing**: Client-side routing with Wouter
- **State Management**: TanStack Query for server state

## Database Configuration

ElettrocarNew uses a separate database instance with:
- Environment variable: DATABASE_URL_NEW
- Table names with "_new" suffix (users_new, photos_new, videos_new)
- Independent schema and data from the original Elettrocar

## Key Components

Same structure as original Elettrocar but with separate database tables:

### Database Schema
- **Users Table**: users_new - Basic user management with username/password authentication
- **Photos Table**: photos_new - Gallery photo management
- **Videos Table**: videos_new - Gallery video management
- **Drizzle Configuration**: PostgreSQL dialect with separate connection

## Recent Changes

### Creation (August 2025)
- **Project Cloned**: Complete duplication of Elettrocar codebase
- **Database Separated**: Configured to use DATABASE_URL_NEW environment variable
- **Schema Updated**: All tables renamed with "_new" suffix for separation
- **Storage Layer Updated**: All database operations point to new tables
- **Independent Configuration**: Separate drizzle.config.ts and package.json

## Architecture Notes

ElettrocarNew maintains complete feature parity with the original Elettrocar while operating on a completely separate database instance. This allows for independent development, testing, and data management without affecting the original application.