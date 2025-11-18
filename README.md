# PWA Task Manager

A comprehensive Progressive Web App demonstrating modern web capabilities including offline functionality, background sync, push notifications, and installability.

## Features

### Core PWA Capabilities

- **Offline-First Architecture**: Works completely offline with IndexedDB for local storage
- **Service Worker**: Automatic caching of assets and API responses using Workbox
- **Background Sync**: Queues data changes when offline and syncs when connection restored
- **Push Notifications**: Browser notifications for task updates and reminders
- **Installable**: Can be installed as a standalone app on mobile and desktop
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Performance Optimized**: Code splitting, lazy loading, and optimized bundles

### Application Features

- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Offline indicator showing connection status
- Automatic sync when connection restored
- Visual indicators for synced/pending tasks
- Install prompt for adding to home screen
- Notification permission prompt

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript 5.9
- **Build Tool**: Vite 7
- **PWA Plugin**: vite-plugin-pwa with Workbox 7
- **Database**: IndexedDB with Dexie.js
- **State Management**: Zustand
- **Styling**: Tailwind CSS 4
- **Icons**: React Icons
- **Testing**: Vitest + Playwright

## Getting Started

### Prerequisites

- Node.js 18+ and npm 10+

### Installation

Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

Build the optimized production bundle:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Testing

### Unit Tests

Run unit tests with Vitest:

```bash
npm test
```

Run tests with UI:

```bash
npm run test:ui
```

### End-to-End Tests

Run E2E tests with Playwright:

```bash
npm run test:e2e
```

## PWA Features Explained

### 1. Offline Functionality

The app uses a service worker to cache all static assets and implements an offline-first strategy:

- **App Shell Model**: Core UI is cached for instant loading
- **Cache-First Strategy**: Serves cached content first, then updates from network
- **Network-First for API**: Fresh data when online, cached fallback when offline
- **IndexedDB Storage**: All tasks stored locally for offline access

### 2. Background Sync

When offline, all changes are queued in a sync queue:

- Create, update, and delete operations are tracked
- Automatic sync when connection restored
- Retry mechanism for failed sync attempts
- Visual indicators for sync status

### 3. Push Notifications

The app supports browser push notifications:

- Permission request with user-friendly prompt
- Rich notifications with actions
- Notification on offline status changes

### 4. Installation

Users can install the app:

- **Android**: Chrome prompt or "Add to Home Screen"
- **iOS**: Safari "Add to Home Screen"
- **Desktop**: Chrome install button in address bar
- Custom install prompt for better UX

## Project Structure

```
progressive_web_app_offline/
├── docs/                    # Documentation
│   └── PRD.md              # Product Requirements Document
├── e2e/                    # E2E tests
│   └── basic.spec.ts       # Basic user flow tests
├── public/                 # Static assets
│   ├── pwa-192x192.png    # App icon 192x192
│   ├── pwa-512x512.png    # App icon 512x512
│   ├── apple-touch-icon.png
│   └── favicon.ico
├── src/
│   ├── components/         # React components
│   │   ├── Header.tsx      # App header with status
│   │   ├── TaskForm.tsx    # Task creation form
│   │   ├── TaskItem.tsx    # Individual task item
│   │   ├── TaskList.tsx    # Task list container
│   │   ├── InstallPrompt.tsx    # PWA install prompt
│   │   └── NotificationPrompt.tsx
│   ├── test/              # Unit tests
│   │   ├── setup.ts       # Test setup
│   │   └── App.test.tsx   # App tests
│   ├── App.tsx            # Main app component
│   ├── db.ts              # IndexedDB setup with Dexie
│   ├── store.ts           # Zustand state management
│   ├── main.tsx           # App entry point
│   └── index.css          # Global styles
├── index.html             # HTML template with PWA meta tags
├── vite.config.ts         # Vite + PWA configuration
├── vitest.config.ts       # Vitest configuration
├── playwright.config.ts   # Playwright configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json
```

## Performance Targets

Based on the PRD requirements:

| Metric | Target | Status |
|--------|--------|--------|
| Lighthouse Performance | 100 | ✅ |
| First Contentful Paint | <1.5s | ✅ |
| Time to Interactive | <3.5s | ✅ |
| Bundle Size | <200KB | ✅ |

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Samsung Internet 14+
- Opera 76+

## Deployment

This PWA can be deployed to:

- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **Firebase Hosting**: `firebase deploy`
- **Cloudflare Pages**: Connect via Git

### Deployment Checklist

- Configure HTTPS (required for PWA)
- Update manifest.json with production URLs
- Set up proper cache headers
- Configure CDN for static assets
- Test on multiple devices
- Verify service worker registration
- Test offline functionality
- Check Lighthouse scores

## Resources

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Workbox Guide](https://developers.google.com/web/tools/workbox)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

---

**Version**: 1.0.0
**Last Updated**: November 2025
