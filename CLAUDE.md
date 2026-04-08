# Job Application Tracker

## Overview
Web app to track job applications through a full interview pipeline with interview prep tools.

## Tech Stack
- Next.js 16 (App Router) with React 19
- Tailwind CSS 4
- In-memory data storage (resets on server restart)

## Pages
1. **Dashboard** `/` — Stats cards, pipeline visualization, recent activity
2. **Applications** `/applications` — Filterable list of all applications, add new
3. **Application Detail** `/applications/[id]` — Dynamic route with status changer, company research notes, preparation checklist
4. **Practice Questions** `/practice` — Categorized interview questions with expand/collapse answers

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
- `GET/POST/DELETE /api/questions` — List all / Create / Delete

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
    layout.js              # Root layout with Navbar
    page.js                # Dashboard
    globals.css            # Tailwind directives + custom styles
    applications/
      page.js              # Applications list
      [id]/page.js         # Application detail (dynamic)
    practice/page.js       # Practice questions
    api/
      applications/
        route.js           # Applications CRUD
        [id]/route.js      # Single application CRUD
      questions/route.js   # Questions CRUD
  components/
    Navbar.js
    ApplicationCard.js
    StatusBadge.js
    StatsCard.js
    ChecklistItem.js
    QuestionCard.js
  lib/
    store.js               # In-memory data store with seed data
```
