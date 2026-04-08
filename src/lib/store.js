// In-memory data store — resets on server restart

let nextAppId = 5;
let nextQuestionId = 7;

const applications = [
  {
    id: '1',
    company: 'Stripe',
    role: 'Senior Frontend Engineer',
    status: 'technical',
    dateApplied: '2026-03-15',
    url: 'https://stripe.com/jobs',
    salary: '$180k - $220k',
    location: 'San Francisco, CA (Remote)',
    notes: 'Tech stack: React, TypeScript, Ruby. Known for great engineering culture. Interview process: recruiter screen -> coding challenge -> technical interviews (2) -> system design -> team match.',
    checklist: {
      resumeTailored: true,
      coverLetter: true,
      companyResearched: true,
      linkedinConnected: false,
      portfolioUpdated: true,
      mockInterview: false,
    },
    createdAt: '2026-03-14T10:00:00Z',
    updatedAt: '2026-04-01T14:30:00Z',
  },
  {
    id: '2',
    company: 'Vercel',
    role: 'Full Stack Developer',
    status: 'applied',
    dateApplied: '2026-04-01',
    url: 'https://vercel.com/careers',
    salary: '$160k - $200k',
    location: 'Remote',
    notes: 'Next.js creators. Focus on developer experience and performance. Small, fast-moving team.',
    checklist: {
      resumeTailored: true,
      coverLetter: false,
      companyResearched: true,
      linkedinConnected: false,
      portfolioUpdated: false,
      mockInterview: false,
    },
    createdAt: '2026-04-01T09:00:00Z',
    updatedAt: '2026-04-01T09:00:00Z',
  },
  {
    id: '3',
    company: 'Airbnb',
    role: 'Software Engineer II',
    status: 'phone-screen',
    dateApplied: '2026-03-20',
    url: 'https://careers.airbnb.com',
    salary: '$170k - $210k',
    location: 'San Francisco, CA',
    notes: 'Ruby on Rails + React. Strong focus on design and user experience. Recruiter mentioned team is focused on search infrastructure.',
    checklist: {
      resumeTailored: true,
      coverLetter: true,
      companyResearched: true,
      linkedinConnected: true,
      portfolioUpdated: true,
      mockInterview: false,
    },
    createdAt: '2026-03-19T11:00:00Z',
    updatedAt: '2026-03-28T16:00:00Z',
  },
  {
    id: '4',
    company: 'Notion',
    role: 'Frontend Engineer',
    status: 'wishlist',
    dateApplied: '',
    url: 'https://notion.so/careers',
    salary: '$150k - $190k',
    location: 'New York, NY (Hybrid)',
    notes: 'Collaborative workspace tool. TypeScript + React. Known for thoughtful product design.',
    checklist: {
      resumeTailored: false,
      coverLetter: false,
      companyResearched: true,
      linkedinConnected: false,
      portfolioUpdated: false,
      mockInterview: false,
    },
    createdAt: '2026-04-05T08:00:00Z',
    updatedAt: '2026-04-05T08:00:00Z',
  },
];

const questions = [
  {
    id: '1',
    category: 'behavioral',
    question: 'Tell me about a time you had to deal with a difficult team member.',
    answer: 'Use STAR method: Situation - worked on a cross-functional project where a senior dev was dismissive of frontend concerns. Task - needed to get buy-in for accessibility improvements. Action - scheduled 1:1, shared data on user impact, proposed compromise approach. Result - they became an ally for a11y and we shipped 40% fewer accessibility bugs.',
    difficulty: 'medium',
  },
  {
    id: '2',
    category: 'technical',
    question: 'Explain the difference between useMemo and useCallback in React.',
    answer: 'useMemo memoizes a computed value, useCallback memoizes a function reference. useMemo(() => computeExpensive(a, b), [a, b]) vs useCallback((x) => doSomething(x, a), [a]). Both prevent unnecessary recalculations/re-renders when deps haven\'t changed. useCallback is essentially useMemo(() => fn, deps).',
    difficulty: 'easy',
  },
  {
    id: '3',
    category: 'system-design',
    question: 'Design a URL shortener service.',
    answer: 'Key components: 1) Hash/encode long URL to short code (base62, 6-7 chars = billions of URLs). 2) Store mapping in DB (NoSQL like DynamoDB for fast reads). 3) 301 redirect on GET. 4) Consider: collision handling, custom aliases, expiration, analytics. Scale: read-heavy (100:1 read/write), use cache (Redis) for hot URLs, CDN for redirects.',
    difficulty: 'hard',
  },
  {
    id: '4',
    category: 'behavioral',
    question: 'Describe a project you\'re most proud of and why.',
    answer: 'Focus on: impact (quantify if possible), technical challenge, what you learned, collaboration aspects. Show passion and growth mindset.',
    difficulty: 'easy',
  },
  {
    id: '5',
    category: 'technical',
    question: 'What is the event loop in JavaScript and how does it work?',
    answer: 'Single-threaded runtime. Call stack executes sync code. Async operations (timers, I/O, promises) go to Web APIs / Node APIs. Callbacks queued in task queue (macrotasks) or microtask queue (promises). Event loop: 1) Execute call stack. 2) Process ALL microtasks. 3) Process ONE macrotask. 4) Repeat. Microtasks (Promise.then) have priority over macrotasks (setTimeout).',
    difficulty: 'medium',
  },
  {
    id: '6',
    category: 'system-design',
    question: 'Design a real-time chat application.',
    answer: 'WebSocket for real-time bidirectional communication. Components: 1) Connection manager (WebSocket server, connection pooling). 2) Message service (store in DB, fanout to recipients). 3) Presence service (online/offline/typing). 4) Storage: messages in Cassandra (write-heavy, time-series), user data in PostgreSQL. 5) Scale: horizontal WS servers behind load balancer (sticky sessions or pub/sub like Redis for cross-server messaging).',
    difficulty: 'hard',
  },
];

export function getApplications() {
  return [...applications];
}

export function getApplication(id) {
  return applications.find((a) => a.id === id) || null;
}

export function createApplication(data) {
  const now = new Date().toISOString();
  const app = {
    id: String(nextAppId++),
    company: data.company || '',
    role: data.role || '',
    status: data.status || 'wishlist',
    dateApplied: data.dateApplied || '',
    url: data.url || '',
    salary: data.salary || '',
    location: data.location || '',
    notes: data.notes || '',
    checklist: {
      resumeTailored: false,
      coverLetter: false,
      companyResearched: false,
      linkedinConnected: false,
      portfolioUpdated: false,
      mockInterview: false,
      ...data.checklist,
    },
    createdAt: now,
    updatedAt: now,
  };
  applications.push(app);
  return app;
}

export function updateApplication(id, data) {
  const idx = applications.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  applications[idx] = {
    ...applications[idx],
    ...data,
    id, // prevent id override
    checklist: {
      ...applications[idx].checklist,
      ...data.checklist,
    },
    updatedAt: new Date().toISOString(),
  };
  return applications[idx];
}

export function deleteApplication(id) {
  const idx = applications.findIndex((a) => a.id === id);
  if (idx === -1) return false;
  applications.splice(idx, 1);
  return true;
}

export function getQuestions() {
  return [...questions];
}

export function createQuestion(data) {
  const q = {
    id: String(nextQuestionId++),
    category: data.category || 'behavioral',
    question: data.question || '',
    answer: data.answer || '',
    difficulty: data.difficulty || 'medium',
  };
  questions.push(q);
  return q;
}

export function deleteQuestion(id) {
  const idx = questions.findIndex((q) => q.id === id);
  if (idx === -1) return false;
  questions.splice(idx, 1);
  return true;
}

export function updateQuestion(id, data) {
  const idx = questions.findIndex((q) => q.id === id);
  if (idx === -1) return null;
  questions[idx] = { ...questions[idx], ...data, id };
  return questions[idx];
}
