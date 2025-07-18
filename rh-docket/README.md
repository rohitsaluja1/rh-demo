# RightHub Inbox - Auto-Docketing Platform

A modern web application for managing patent and trademark docketing workflows. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🎯 Product Context

RightHub-style auto-docketing: The platform ingests PTO emails / uploads, auto-matches each to a trademark-/patent-/design-record, then queues them for paralegal review.

**Inbox page = control tower**: Paralegals land here first thing each morning to see every new message, confirm matches, and trigger the one-click docketing workflow.

## ✨ Features

### MVP Features (Current Sprint)
- ✅ **Inbox List View**: Table with 10 sample rows displaying all required columns
- ✅ **Status Pills & Row Badges**: Three badge colors (green = Matched, yellow = Unmatched, orange = Partial)
- ✅ **Search & Basic Filters**: Free-text search on Subject; dropdown filter on Status
- ✅ **Sidebar + Top Bar Skeleton**: Left nav stub (Home, Docketing ▸ Inbox); top search bar & "Upload documents" button placeholder
- ✅ **Responsive Design**: Table scrolls; sidebar collapses below 1024px
- ✅ **Mock Data**: Sample data loaded from `/src/mock/inbox.json`; all actions log to console

### Technical Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Table**: @tanstack/react-table v8
- **Icons**: lucide-react
- **State Management**: zustand
- **Animations**: Framer Motion

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rh-docket
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

The application will automatically redirect to the Inbox page at `/docketing/inbox`.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
/src
 ├─ /components
 │   ├─ Layout.tsx        ← sidebar + top bar
 │   ├─ InboxTable.tsx    ← table wrapper
 │   ├─ StatusPill.tsx    ← status badges
 │   └─ SearchBar.tsx     ← search input
 ├─ /app
 │   ├─ /docketing/inbox/page.tsx  ← main inbox page
 │   ├─ layout.tsx        ← root layout
 │   └─ page.tsx          ← redirect to inbox
 ├─ /mock
 │   └─ inbox.json        ← sample data
 └─ /store
     └─ inboxStore.ts     ← zustand state management
```

## 🎨 Design System

### Colors
- **Primary Blue**: `#3b82f6` (blue-500)
- **Success Green**: `#10b981` (green-500)
- **Warning Yellow**: `#f59e0b` (yellow-500)
- **Partial Orange**: `#f97316` (orange-500)
- **Gray Scale**: Full gray palette from 50-900

### Typography
- **Font Family**: Inter (system fallback)
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Components
- **StatusPill**: Colored badges with dots for status indication
- **SearchBar**: Consistent search input with icon
- **InboxTable**: Sortable, filterable table with React Table v8
- **Layout**: Responsive sidebar with Framer Motion animations

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### State Management
The application uses Zustand for state management with the following store structure:

```typescript
interface InboxStore {
  items: InboxItem[];
  searchQuery: string;
  statusFilter: string;
  selectedItems: string[];
  viewMode: 'list' | 'card';
  // ... actions and computed values
}
```

### Data Structure
```typescript
interface InboxItem {
  id: string;
  type: 'Email' | 'Manual upload';
  from: string;
  source: string;
  subject: string;
  client: string;
  recordRef: string;
  datetime: string;
  event: string;
  attachments: number;
  status: 'Matched' | 'Unmatched' | 'Partial';
}
```

## 🎯 Next Steps

Once the Inbox page is live with mock data, the next milestone is:
- Backend integration & AI extraction review modal
- Deadline-rule engine
- Global notifications
- Advanced filtering and sorting
- Bulk actions
- Export functionality

## 📝 Notes

- All actions currently log to console (no backend integration yet)
- Mock data is loaded from `/src/mock/inbox.json`
- Responsive design with mobile-first approach
- TypeScript strict mode enabled
- ESLint configured for code quality

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Add TypeScript types for all new features
3. Test responsive behavior on different screen sizes
4. Ensure all actions have proper console logging for future API integration
