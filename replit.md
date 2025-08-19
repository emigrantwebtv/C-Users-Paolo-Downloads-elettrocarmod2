# replit.md

## Overview

This is a full-stack web application built with a React frontend and Express.js backend. The application appears to be a business website for "ELETTROCAR," an Italian automotive service center offering car wash, workshop, e-bike services, and a bar. The application uses a modern tech stack with TypeScript, shadcn/ui components, TailwindCSS for styling, and Drizzle ORM with PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

- **Frontend**: React SPA with TypeScript, built with Vite
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: TailwindCSS with CSS custom properties for theming
- **Routing**: Client-side routing with Wouter
- **State Management**: TanStack Query for server state

## Key Components

### Frontend Structure
- **Client Directory**: Contains the React application
- **Components**: Reusable UI components built with shadcn/ui
- **Pages**: Route-specific page components for each service area
- **Hooks**: Custom React hooks for functionality like mobile detection and toast notifications
- **Lib**: Utility functions and query client configuration

### Backend Structure
- **Server Directory**: Express.js application with TypeScript
- **Routes**: API route handlers (currently minimal setup)
- **Storage**: Data access layer with in-memory implementation and interface for database operations
- **Vite Integration**: Development server setup with HMR support

### Database Schema
- **Users Table**: Basic user management with username/password authentication
- **Drizzle Configuration**: PostgreSQL dialect with migrations support

## Data Flow

1. **Client-Side Routing**: Wouter handles navigation between different service pages
2. **API Communication**: TanStack Query manages server state and HTTP requests
3. **Data Access**: Storage interface abstracts database operations
4. **State Management**: React hooks and TanStack Query for client state

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible component primitives
- **TailwindCSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Class Variance Authority**: Conditional CSS class management

### Backend and Database
- **Drizzle ORM**: Type-safe database operations
- **Neon Database**: Serverless PostgreSQL provider
- **Express.js**: Web application framework

### Development Tools
- **TypeScript**: Type safety across the stack
- **Vite**: Fast development build tool
- **ESBuild**: Production bundling for server code

## Deployment Strategy

The application is configured for production deployment with:

1. **Build Process**: 
   - Frontend: Vite builds optimized React bundle
   - Backend: ESBuild bundles server code with external packages
   
2. **Environment Variables**: 
   - `DATABASE_URL` for PostgreSQL connection
   - `NODE_ENV` for environment-specific behavior
   
3. **Static Asset Serving**: Express serves built frontend assets in production

4. **Database Management**: 
   - Drizzle migrations for schema changes
   - Push command for development schema updates

## Recent Changes

### Latest Updates (January 2025)
- **Migration Completed**: Successfully migrated project from Replit Agent to Replit environment
- **Database Setup**: Created PostgreSQL database with proper credentials and pushed schema with tables for users, photos, and videos
- **Application Running**: Fixed all dependency and configuration issues, application now running successfully on port 5000
- **All Features Working**: All pages (Chi Siamo, Officina, Autolavaggio, E-bikes, Bar, Dove Siamo, Gallery, Contatti) loading properly
- **Updated Chi Siamo Video**: Replaced company presentation video with new updated version per user request (video_chi_siamo_1755450804254.mp4)
- **Updated Officina Video**: Replaced workshop video with new updated version per user request (video_officina_1755450938248.mp4)
- **Updated Autolavaggio Video**: Replaced car wash video with new updated version per user request (video_autolavaggio_1755451124305.mp4)
- **Updated E-bikes Video**: Replaced e-bike video with new updated version per user request (video_ebikes_1755451281208.mp4)
- **Updated Bar Video**: Replaced bar video with new updated version per user request (video_bar_1755451430332.mp4)
- **Updated Dove Siamo Video**: Replaced tire promotional video with new updated version per user request (gomme_callara_1755451856061.mp4)
- **Updated Dove Siamo Videos**: Removed original tire video, kept only company presentation video labeled as tire promotional content per user request
- **Updated E-bikes Images**: Replaced 3 GIF images with single new comprehensive image (animazionebikesOK_1755600733976.gif) per user request
- **Added E-bikes Logo**: Added ELETTROCARBIKES logo image before main image on E-bikes page (logo_ebikes_1755601785526.jpg)
- **Added Autolavaggio Logo**: Added ELETTROCARWASH logo image before main image on Autolavaggio page (logo_autolavaggio_1755608277413.jpg)
- **Photo/Video Gallery**: Upload and delete functionality working with password protection
- **Google Maps Integration**: "Dove Siamo" page includes interactive map with real business location
- **Asset Management**: All business videos and images displaying correctly with authentic content
- **Responsive Design**: Mobile-optimized interface with proper touch navigation
- **Security**: Proper client/server separation with robust security practices implemented

### Previous Updates (December 2024)
- Updated all page descriptions with custom Italian content for Elettrocar business
- Added custom videos (Chi Siamo, Officina, Autolavaggio, E-bikes) with autoplay functionality
- Replaced placeholder images with custom business images for all 4 main service pages
- Configured video playback with audio enabled and loop functionality
- Implemented blue text styling for all page descriptions
- Optimized mobile video display with proper aspect ratios

### User Request Context
User completed migration from Replit Agent and requested integration of Google Maps location in the "Dove Siamo" page.

## Architecture Notes

The current setup uses an in-memory storage implementation but is architected to easily switch to PostgreSQL through the storage interface abstraction. The application is mobile-responsive with touch-optimized navigation and follows modern web development best practices.