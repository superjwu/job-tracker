# Job Application Tracker

## Overview
Web app to track job applications through a full interview pipeline with interview prep tools.

## Tech Stack
- Next.js 16 (App Router) with React 19
- Tailwind CSS 4
- In-memory data storage (resets on server restart)

## Pages
1. **Dashboard** `/` — Stats cards, pipeline visualization, recent activity
2. **Applications** `/applications` — Search, sort, filterable list, add new applications
3. **Application Detail** `/applications/[id]` — Dynamic route with status changer, company research notes (auto-save), preparation checklist
4. **Practice Questions** `/practice` — Search, categorized questions with expand/collapse answers, inline editing

## Data Models

### Application
- id, company, role, status, dateApplied, url, salary, location
- notes (company research)
- checklist: resumeTailored, coverLetter, companyResearched, linkedinConnected, portfolioUpdated, mockInterview
- createdAt, updatedAt

### Question
- id, category (behavioral/technical/system-design), question, answer, difficulty (easy/medium/hard)

## Pipeline Statuses
Wishlist -> Applied -> Phone Screen -> Technical -> Onsite -> Offer -> Accepted/Rejected

## API Routes
- `GET/POST /api/applications` — List all / Create new
- `GET/PUT/DELETE /api/applications/[id]` — Read / Update / Delete one
- `GET/POST /api/questions` — List all / Create new
- `PUT/DELETE /api/questions/[id]` — Update / Delete one

## Key Architecture
- **Constants**: All shared constants (statuses, colors, labels) centralized in `src/lib/constants.js`
- **Toast system**: Context-based notifications via `src/components/Toast.js`, wrapped in `Providers.js`
- **Error handling**: All fetch calls wrapped in try/catch with error toasts
- **Forms**: Auto-close on success, show toast, disable button during submit

## Dev Commands
```bash
npm run dev    # Start dev server on port 3000
npm run build  # Production build
npm run lint   # Run ESLint
```

## Project Structure
```
src/
  app/
    layout.js              # Root layout with Navbar + Providers
    page.js                # Dashboard
    globals.css            # Tailwind directives + toast animation
    applications/
      page.js              # Applications list (search, sort, filter)
      [id]/page.js         # Application detail (dynamic)
    practice/page.js       # Practice questions (search, filter)
    api/
      applications/
        route.js           # GET all / POST new
        [id]/route.js      # GET / PUT / DELETE one
      questions/
        route.js           # GET all / POST new
        [id]/route.js      # PUT / DELETE one
  components/
    Navbar.js              # Responsive nav, closes on route change
    Providers.js           # Client-side context providers
    Toast.js               # Toast notification context + display
    ApplicationCard.js
    StatusBadge.js
    StatsCard.js
    ChecklistItem.js
    QuestionCard.js        # Expand/collapse with inline edit support
  lib/
    constants.js           # Shared statuses, colors, labels, categories
    store.js               # In-memory data store with seed data
```
